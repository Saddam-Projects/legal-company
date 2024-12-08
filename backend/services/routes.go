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

	serviceTermRepository := repositories.NewServiceTermRepository()
	serviceTermHandler := handlers.NewServiceTermHandler(serviceTermRepository, serviceRepository)
	serviceTermController := controllers.NewServiceTermController(serviceTermHandler, db)

	customerRepository := repositories.NewCustomerRepository()
	customerHandler := handlers.NewCustomerHandler(customerRepository)
	customerController := controllers.NewCustomerController(customerHandler, db)

	orderRepository := repositories.NewOrderRepository()
	orderHandler := handlers.NewOrderHandler(orderRepository, serviceRepository, customerRepository)
	orderController := controllers.NewOrderController(orderHandler, db)

	api.Get("/service", serviceController.FindAll)
	api.Get("/service/:id", serviceController.FindById)
	api.Post("/service", serviceController.Create)
	api.Post("/service/:id/update", serviceController.Update)
	api.Post("/service/:id/delete", serviceController.Delete)

	api.Get("/order", orderController.FindAll)
	api.Get("/order/:id", orderController.FindOne)
	api.Post("/order", orderController.Create)

	api.Get("/customer", customerController.FindAll)
	api.Get("/customer/:id", customerController.FindOne)

	api.Post("/service-term", serviceTermController.Create)
	api.Post("/service-term/:id/update", serviceTermController.Update)
	api.Post("/service-term/:id/delete", serviceTermController.Delete)

}
