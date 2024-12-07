package libs

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
)

type HttpLib interface {
	Connect(url string, port int)
}
type HttpLibImpl struct {
	engine *fiber.App
}

func NewHttpLib(
	engine *fiber.App,
) HttpLib {
	return &HttpLibImpl{
		engine: engine,
	}
}

func (h *HttpLibImpl) Connect(url string, port int) {
	err := h.engine.Listen(fmt.Sprintf("%s:%d", url, port))
	if err != nil {
		log.Fatal(err)
	}
}
