package server

import (
	"context"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"time"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"

	"github.com/m1k1o/neko-rooms/internal/config"
	"github.com/m1k1o/neko-rooms/internal/types"
)

type ServerManagerCtx struct {
	logger zerolog.Logger
	router *chi.Mux
	server *http.Server
	config *config.Server
}

func New(ApiManager types.ApiManager, roomConfig *config.Room, config *config.Server, proxyHandler http.Handler) *ServerManagerCtx {
	logger := log.With().Str("module", "server").Logger()

	router := chi.NewRouter()
	router.Use(middleware.RequestID) // Create a request ID for each request

	// get real users ip
	if config.Proxy {
		router.Use(middleware.RealIP)
	}

	// add http logger
	router.Use(middleware.RequestLogger(&logformatter{logger}))
	router.Use(middleware.Recoverer) // Recover from panics without crashing server

	// Basic CORS
	// for more ideas, see: https://developer.github.com/v3/#cross-origin-resource-sharing
	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))

	// mount pprof endpoint
	if config.PProf {
		withPProf(router)
		logger.Info().Msgf("with pprof endpoint at %s", pprofPath)
	}

	//
	// admin page
	//

	protected := func(next http.Handler) http.Handler {
		// if auth is disabled
		if config.Admin.Username == "" || config.Admin.Password == "" {
			return next
		}

		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			user, pass, ok := r.BasicAuth()
			if !ok || user != config.Admin.Username || pass != config.Admin.Password {
				w.Header().Add("WWW-Authenticate", `Basic realm="neko-rooms admin"`)
				w.WriteHeader(http.StatusUnauthorized)
				return
			}

			next.ServeHTTP(w, r)
		})
	}

	// cache static file paths
	staticFiles := map[string]struct{}{}
	if config.Admin.Static != "" {
		filepath.Walk(config.Admin.Static,
			func(p string, info os.FileInfo, err error) error {
				if err != nil {
					return err
				}
				staticFiles[path.Clean(p)] = struct{}{}
				return nil
			})
	}

	// serve static files
	router.Use(func(next http.Handler) http.Handler {
		// if static files are disabled
		if config.Admin.Static == "" {
			return next
		}

		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			filePath := path.Join(config.Admin.Static, r.URL.Path)

			// check if file exists to serve it
			if _, ok := staticFiles[filePath]; ok {
				// serve protected assets
				protected(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
					http.ServeFile(w, r, filePath)
				})).ServeHTTP(w, r)
				return
			}

			next.ServeHTTP(w, r)
		})
	})

	// serve protected API
	router.With(protected).Route("/api", ApiManager.Mount)

	// handle all remaining paths with proxy
	router.Handle("/*", proxyHandler)

	return &ServerManagerCtx{
		logger: logger,
		router: router,
		server: &http.Server{
			Addr:    config.Bind,
			Handler: router,
		},
		config: config,
	}
}

func (s *ServerManagerCtx) Start() {
	if s.config.Cert != "" && s.config.Key != "" {
		go func() {
			if err := s.server.ListenAndServeTLS(s.config.Cert, s.config.Key); err != http.ErrServerClosed {
				s.logger.Panic().Err(err).Msg("unable to start https server")
			}
		}()
		s.logger.Info().Msgf("https listening on %s", s.server.Addr)
	} else {
		go func() {
			if err := s.server.ListenAndServe(); err != http.ErrServerClosed {
				s.logger.Panic().Err(err).Msg("unable to start http server")
			}
		}()
		s.logger.Info().Msgf("http listening on %s", s.server.Addr)
	}
}

func (s *ServerManagerCtx) Shutdown() error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	return s.server.Shutdown(ctx)
}
