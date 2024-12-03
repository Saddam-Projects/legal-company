package libs

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type DBConfig struct {
	Host     string
	Port     string
	Username string
	Password string
	Database string
	Ssl      string
}

type DbLib interface {
	Connect(config DBConfig) *gorm.DB
}

type DbLibImpl struct {
}

func NewDbLib() DbLib {
	return &DbLibImpl{}
}

func (d *DbLibImpl) Connect(ctx DBConfig) *gorm.DB {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname= %s port=%s sslmode=%s", ctx.Host, ctx.Username, ctx.Password, ctx.Database, ctx.Port, ctx.Ssl)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	return db
}
