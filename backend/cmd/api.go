package main

import (
	"os"

	"github.com/joho/godotenv"
	"github.com/saddam-satria/hris-be/libs"
)

func main() {
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
	dbLib.Connect(dbConfig)
	// Load Library
	httpLib := libs.NewHttpLib()
	httpLib.Connect("localhost", 8080)
}
