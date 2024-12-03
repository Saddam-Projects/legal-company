package libs

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
)

type HttpLib interface {
	Connect(url string, port int) *fiber.App
}
type HttpLibImpl struct{}

func NewHttpLib() HttpLib {
	return &HttpLibImpl{}
}

func (h *HttpLibImpl) Connect(url string, port int) *fiber.App {
	engine := fiber.New(fiber.Config{})
	err := engine.Listen(fmt.Sprintf("%s:%d", url, port))
	if err != nil {
		log.Fatal(err)
	}
	return engine
}
