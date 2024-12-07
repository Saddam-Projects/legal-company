package handlers

import (
	"fmt"
	"strings"
	"time"

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
}

func NewServiceHandler(
	serviceRepository repositories.ServiceRepository,
) ServiceHandler {
	return &ServiceHandlerImpl{
		serviceRepository: serviceRepository,
	}
}

func (s *ServiceHandlerImpl) FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.Service, *libs.ErrorResponse) {
	services, err := s.serviceRepository.FindAll(ctx, db)

	return services, err
}

func (s *ServiceHandlerImpl) Create(ctx *fiber.Ctx, db *gorm.DB, dt *dtos.ServiceDTO) (*models.Service, *libs.ErrorResponse) {

	var fileName string
	fileReq, errFileReq := ctx.FormFile("file")
	if errFileReq == nil {
		if fileReq.Size > 2<<20 {
			return nil, &libs.ErrorResponse{Status: 400, Message: "File too large"}
		}
		now := time.Now().Format("2006-01-02-230059")
		fileFormat := strings.Split(fileReq.Filename, ".")
		extensionFile := string(fileFormat[len(fileFormat)-1])

		if extensionFile != "jpg" && extensionFile != "png" && extensionFile != "jpeg" {
			return nil, &libs.ErrorResponse{Status: 400, Message: "Invalid file format"}
		}

		newFileName := fmt.Sprintf("%s.%s", now, extensionFile)

		err := ctx.SaveFile(fileReq, fmt.Sprintf("./public/uploads/%s", newFileName))
		if err != nil {
			return nil, &libs.ErrorResponse{Status: 400, Message: "Failed to save file"}
		}
		fileName = fmt.Sprintf("uploads/%s", newFileName)
	}

	newService := models.Service{
		Name:        dt.Service_name,
		Price:       float64(dt.Price),
		Description: dt.Description,
		Image:       &fileName,
	}

	service, err := s.serviceRepository.Create(ctx, db, &newService)

	if err != nil {
		return nil, err
	}
	return service, nil
}

func (s *ServiceHandlerImpl) Update(ctx *fiber.Ctx, db *gorm.DB, dt *dtos.ServiceDTO) (*models.Service, *libs.ErrorResponse) {

	var fileName string
	fileReq, errFileReq := ctx.FormFile("file")
	if errFileReq == nil {
		if fileReq.Size > 2<<20 {
			return nil, &libs.ErrorResponse{Status: 400, Message: "File too large"}
		}
		now := time.Now().Format("2006-01-02-230059")
		fileFormat := strings.Split(fileReq.Filename, ".")
		extensionFile := string(fileFormat[len(fileFormat)-1])

		if extensionFile != "jpg" && extensionFile != "png" && extensionFile != "jpeg" {
			return nil, &libs.ErrorResponse{Status: 400, Message: "Invalid file format"}
		}

		newFileName := fmt.Sprintf("%s.%s", now, extensionFile)

		err := ctx.SaveFile(fileReq, fmt.Sprintf("./public/uploads/%s", newFileName))
		if err != nil {
			return nil, &libs.ErrorResponse{Status: 400, Message: "Failed to save file"}
		}
		fileName = fmt.Sprintf("uploads/%s", newFileName)
	}

	service, err := s.serviceRepository.FindById(ctx, db, ctx.Params("id"))

	if err != nil {
		return nil, err
	}

	service.Name = dt.Service_name
	service.Price = float64(dt.Price)
	service.Description = dt.Description

	if fileName != "" {
		service.Image = &fileName
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
