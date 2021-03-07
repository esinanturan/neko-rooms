package cmd

import (
	"fmt"
	"io"
	"os"
	"path/filepath"
	"runtime"
	"time"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/diode"
	"github.com/rs/zerolog/log"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"

	"m1k1o/neko_rooms"
)

func Execute() error {
	return root.Execute()
}

var root = &cobra.Command{
	Use:     "neko_rooms",
	Short:   "neko_rooms server",
	Long:    `neko_rooms server`,
	Version: neko_rooms.Service.Version.String(),
}

func init() {
	cobra.OnInitialize(func() {
		//////
		// logs
		//////
		zerolog.TimeFieldFormat = ""
		zerolog.SetGlobalLevel(zerolog.InfoLevel)

		if viper.GetBool("debug") {
			zerolog.SetGlobalLevel(zerolog.DebugLevel)
		}

		console := zerolog.ConsoleWriter{Out: os.Stdout}

		if !viper.GetBool("logs") {
			log.Logger = log.Output(console)
		} else {

			logs := filepath.Join(".", "logs")
			if runtime.GOOS == "linux" {
				logs = "/var/log/neko_rooms"
			}

			if _, err := os.Stat(logs); os.IsNotExist(err) {
				os.Mkdir(logs, os.ModePerm)
			}

			latest := filepath.Join(logs, "neko_rooms-latest.log")
			_, err := os.Stat(latest)
			if err == nil {
				err = os.Rename(latest, filepath.Join(logs, "neko_rooms."+time.Now().Format("2006-01-02T15-04-05Z07-00")+".log"))
				if err != nil {
					log.Panic().Err(err).Msg("failed to rotate log file")
				}
			}

			logf, err := os.OpenFile(latest, os.O_RDWR|os.O_CREATE, 0666)
			if err != nil {
				log.Panic().Err(err).Msg("failed to create log file")
			}

			logger := diode.NewWriter(logf, 1000, 10*time.Millisecond, func(missed int) {
				fmt.Printf("logger dropped %d messages", missed)
			})

			log.Logger = log.Output(io.MultiWriter(console, logger))
		}

		//////
		// configs
		//////
		config := viper.GetString("config")
		if config != "" {
			viper.SetConfigFile(config) // Use config file from the flag.
		} else {
			if runtime.GOOS == "linux" {
				viper.AddConfigPath("/etc/neko_rooms/")
			}

			viper.AddConfigPath(".")
			viper.SetConfigName("neko_rooms")
		}

		viper.SetEnvPrefix("NEKO_ROOMS")
		viper.AutomaticEnv() // read in environment variables that match

		if err := viper.ReadInConfig(); err != nil {
			if _, ok := err.(viper.ConfigFileNotFoundError); !ok {
				log.Error().Err(err)
			}
			if config != "" {
				log.Error().Err(err)
			}
		}

		file := viper.ConfigFileUsed()
		logger := log.With().
			Bool("debug", viper.GetBool("debug")).
			Str("logging", viper.GetString("logs")).
			Str("config", file).
			Logger()

		if file == "" {
			logger.Warn().Msg("preflight complete without config file")
		} else {
			logger.Info().Msg("preflight complete")
		}

		neko_rooms.Service.Configs.Root.Set()
	})

	if err := neko_rooms.Service.Configs.Root.Init(root); err != nil {
		log.Panic().Err(err).Msg("unable to run root command")
	}

	root.SetVersionTemplate(neko_rooms.Service.Version.Details())
}
