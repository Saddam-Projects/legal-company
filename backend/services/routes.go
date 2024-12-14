package services

import (
	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/libs"
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
	uploadLib := libs.NewUploadFile()

	serviceRepository := repositories.NewServiceRepository()
	serviceHandler := handlers.NewServiceHandler(serviceRepository, uploadLib)
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

	referenceRepository := repositories.NewReferenceRepository()
	referenceHandler := handlers.NewReferenceHandler(referenceRepository)
	referenceController := controllers.NewReferenceController(referenceHandler, db)

	galleryRepository := repositories.NewGalleryRepository()
	galleryHandler := handlers.NewGalleryHandler(galleryRepository, db, uploadLib)
	galleryController := controllers.NewGalleryController(galleryHandler)

	bannerRepository := repositories.NewBannerRepository()
	bannerHandler := handlers.NewBannerHandler(bannerRepository, db, uploadLib)
	bannerController := controllers.NewBannerController(bannerHandler)

	clientLogoRepository := repositories.NewClientLogoRepository()
	clientLogoHandler := handlers.NewClientLogoHandler(clientLogoRepository, db, uploadLib)
	clientLogoController := controllers.NewClientLogoController(clientLogoHandler)

	dashboardHandler := handlers.NewDashboardHandler(customerRepository, orderRepository, clientLogoRepository, serviceRepository, db)
	dashboardController := controllers.NewDashboardController(dashboardHandler)

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
	api.Post("/customer", customerController.Create)
	api.Post("/customer/:id/update", customerController.Update)
	api.Post("/customer/:id/delete", customerController.Delete)

	api.Post("/service-term", serviceTermController.Create)
	api.Post("/service-term/:id/update", serviceTermController.Update)
	api.Post("/service-term/:id/delete", serviceTermController.Delete)

	api.Get("/reference", referenceController.FindAll)
	api.Get("/reference/:id", referenceController.FindOne)
	api.Post("/reference/:id/update", referenceController.Update)

	api.Get("/gallery", galleryController.FindAll)
	api.Get("/gallery/:id", galleryController.FindOne)
	api.Post("/gallery", galleryController.Create)
	api.Post("/gallery/:id/update", galleryController.Update)
	api.Post("/gallery/:id/delete", galleryController.Delete)

	api.Get("/banner", bannerController.FindAll)
	api.Get("/banner/:id", bannerController.FindOne)
	api.Post("/banner", bannerController.Create)
	api.Post("/banner/:id/update", bannerController.Update)
	api.Post("/banner/:id/delete", bannerController.Delete)

	api.Get("/client-logo", clientLogoController.FindAll)
	api.Get("/client-logo/:id", clientLogoController.FindOne)
	api.Post("/client-logo", clientLogoController.Create)
	api.Post("/client-logo/:id/update", clientLogoController.Update)
	api.Post("/client-logo/:id/delete", clientLogoController.Delete)

	api.Get("/dashboard/statistic", dashboardController.GetStatistic)

}
