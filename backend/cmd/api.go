package main

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"github.com/saddam-satria/legal-be/libs"
	"github.com/saddam-satria/legal-be/services"
)

func main() {
	// Load Library
	godotenv.Load()
	dbConfig := libs.DBConfig{
		Host:     os.Getenv("DB_HOST"),
		Port:     os.Getenv("DB_PORT"),
		Username: os.Getenv("DB_USERNAME"),
		Password: os.Getenv("DB_PASSWORD"),
		Database: os.Getenv("DB_DATABASE"),
		Ssl:      os.Getenv("DB_SSL"),
	}
	dbLib := libs.NewDbLib()
	conn := dbLib.Connect(dbConfig)

	http := fiber.New(fiber.Config{})
	http.Use(cors.New(
		cors.Config{
			AllowOrigins: "*",
			AllowHeaders: "Origin, Content-Type, Accept",
		},
	))
	httpLib := libs.NewHttpLib(http)

	// Register Routes (from submodule)
	services.NewLegalRoutes().Register(http, conn)
	httpLib.Connect("0.0.0.0", 8000)
}
