package services

import (
	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/services/controllers"
	"github.com/saddam-satria/legal-be/services/handlers"
	"github.com/saddam-satria/legal-be/services/repositories"
	"gorm.io/gorm"
)

type LegalRoutes interface {
	Register(api *fiber.App, db *gorm.DB)
}

type LegalRoutesImpl struct{}

func NewLegalRoutes() LegalRoutes {
	return &LegalRoutesImpl{}
}

func (r *LegalRoutesImpl) Register(api *fiber.App, db *gorm.DB) {

	// Serve Static
	api.Static("/", "./public")

	// Load Service, Repository, and Handler (from submodule)

	serviceRepository := repositories.NewServiceRepository()
	serviceHandler := handlers.NewServiceHandler(serviceRepository)
	serviceController := controllers.NewServiceController(serviceHandler, db)

	api.Get("/service", serviceController.FindAll)
	api.Get("/service/:id", serviceController.FindById)
	api.Post("/service", serviceController.Create)
	api.Post("/service/:id/update", serviceController.Update)
	api.Post("/service/:id/delete", serviceController.Delete)
}
