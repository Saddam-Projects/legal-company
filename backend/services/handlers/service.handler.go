package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/libs"
	"github.com/saddam-satria/legal-be/services/dtos"
	"github.com/saddam-satria/legal-be/services/models"
	"github.com/saddam-satria/legal-be/services/repositories"
	"gorm.io/gorm"
)

type ServiceHandler interface {
	FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.Service, *libs.ErrorResponse)
	Create(ctx *fiber.Ctx, db *gorm.DB, dt *dtos.ServiceDTO) (*models.Service, *libs.ErrorResponse)
	Update(ctx *fiber.Ctx, db *gorm.DB, dt *dtos.ServiceDTO) (*models.Service, *libs.ErrorResponse)
	Delete(ctx *fiber.Ctx, db *gorm.DB) (*models.Service, *libs.ErrorResponse)
	FindById(ctx *fiber.Ctx, db *gorm.DB, id string) (*models.Service, *libs.ErrorResponse)
}
type ServiceHandlerImpl struct {
	serviceRepository repositories.ServiceRepository
	uploadLib         libs.UploadFile
}

func NewServiceHandler(
	serviceRepository repositories.ServiceRepository,
	uploadLib libs.UploadFile,
) ServiceHandler {
	return &ServiceHandlerImpl{
		serviceRepository: serviceRepository,
		uploadLib:         uploadLib,
	}
}

func (s *ServiceHandlerImpl) FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.Service, *libs.ErrorResponse) {
	services, err := s.serviceRepository.FindAll(ctx, db)

	return services, err
}

func (s *ServiceHandlerImpl) Create(ctx *fiber.Ctx, db *gorm.DB, dt *dtos.ServiceDTO) (*models.Service, *libs.ErrorResponse) {

	fileName, errFilename := s.uploadLib.Upload(ctx)

	if errFilename != nil {
		return nil, errFilename
	}

	newService := models.Service{
		Name:        dt.Service_name,
		Price:       float64(dt.Price),
		Description: dt.Description,
		Image:       fileName,
	}

	newTerms := make([]models.ServiceTerm, 0)
	for _, service := range dt.Terms {
		newTerms = append(newTerms, models.ServiceTerm{
			TermName:   service,
			Service_id: newService.Id.String(),
		})
	}

	newService.ServiceTerms = newTerms
	service, err := s.serviceRepository.Create(ctx, db, &newService)

	if err != nil {
		return nil, err
	}
	return service, nil
}

func (s *ServiceHandlerImpl) Update(ctx *fiber.Ctx, db *gorm.DB, dt *dtos.ServiceDTO) (*models.Service, *libs.ErrorResponse) {

	fileName, errFile := s.uploadLib.Upload(ctx)

	if errFile != nil {
		return nil, errFile
	}
	service, err := s.serviceRepository.FindById(ctx, db, ctx.Params("id"))

	if err != nil {
		return nil, err
	}

	service.Name = dt.Service_name
	service.Price = float64(dt.Price)
	service.Description = dt.Description

	if fileName != nil {
		service.Image = fileName
	}

	updatedService, err := s.serviceRepository.Update(ctx, db, service)

	if err != nil {
		return nil, err
	}
	return updatedService, nil
}

func (s *ServiceHandlerImpl) Delete(ctx *fiber.Ctx, db *gorm.DB) (*models.Service, *libs.ErrorResponse) {
	service, err := s.serviceRepository.Delete(ctx, db)
	if err != nil {
		return nil, err
	}
	return service, err
}

func (s *ServiceHandlerImpl) FindById(ctx *fiber.Ctx, db *gorm.DB, id string) (*models.Service, *libs.ErrorResponse) {
	service, err := s.serviceRepository.FindById(ctx, db, id)
	if err != nil {
		return nil, err
	}
	return service, err

}
