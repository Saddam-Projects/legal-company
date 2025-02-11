package repositories

import (
	"errors"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/libs"
	"github.com/saddam-satria/legal-be/services/models"
	"gorm.io/gorm"
)

type ServiceRepository interface {
	FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.Service, *libs.ErrorResponse)
	FindById(ctx *fiber.Ctx, db *gorm.DB, id string) (*models.Service, *libs.ErrorResponse)
	Create(ctx *fiber.Ctx, db *gorm.DB, service *models.Service) (*models.Service, *libs.ErrorResponse)
	Update(ctx *fiber.Ctx, db *gorm.DB, service *models.Service) (*models.Service, *libs.ErrorResponse)
	Delete(ctx *fiber.Ctx, db *gorm.DB) (*models.Service, *libs.ErrorResponse)
	FindManyByIds(ctx *fiber.Ctx, db *gorm.DB, ids []string) ([]models.Service, *libs.ErrorResponse)
	CountData(ctx *fiber.Ctx, db *gorm.DB) (int64, *libs.ErrorResponse)
}

type ServiceRepositoryImpl struct {
}

func NewServiceRepository() ServiceRepository {
	return &ServiceRepositoryImpl{}
}
func (r *ServiceRepositoryImpl) FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.Service, *libs.ErrorResponse) {
	var services []models.Service
	query := db.Where("is_deleted = 0").Preload("ServiceTerms", "is_deleted = 0").Order("created_at DESC")

	k := ctx.Query("keyword")

	sortCtx := ctx.Query("sort")
	unknownPrice := ctx.Query("is-unknown-price")
	limit := 100
	offset := 0

	limitQuery := ctx.Query("limit")
	limitInt, errConvLimit := strconv.Atoi(limitQuery)
	if errConvLimit == nil && limitInt > 0 {
		limit = limitInt
	}

	offsetQuery := ctx.Query("offset")
	offsetInt, errConvOffset := strconv.Atoi(offsetQuery)
	if errConvOffset == nil && offsetInt > 0 {
		offset = offsetInt
	}

	if unknownPrice == "true" {
		query.Where("price = 0")
	}

	if unknownPrice == "false" {
		query.Where("price>0")
	}

	if sortCtx == "" {
		query.Order("created_at DESC")
	}

	if sortCtx == "old" {
		query.Order("created_at ASC")
	}
	if sortCtx == "new" {
		query.Order("created_at DESC")
	}

	if sortCtx == "cheap" {
		query.Order("price ASC")
	}

	if sortCtx == "expensive" {
		query.Order("price DESC")
	}

	if k != "" {
		query.Where("name LIKE ?", "%"+k+"%")
	}

	if query.Error != nil {
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to get data"}
	}

	query.Limit(limit).Offset(offset).Find(&services)
	return services, nil
}

func (r *ServiceRepositoryImpl) FindById(ctx *fiber.Ctx, db *gorm.DB, id string) (*models.Service, *libs.ErrorResponse) {
	var service *models.Service

	query := db.Where("id = ? and is_deleted = 0", id).Preload("ServiceTerms", "is_deleted = 0").First(&service)

	if query.Error != nil {
		if errors.Is(query.Error, gorm.ErrRecordNotFound) {
			return nil, &libs.ErrorResponse{Status: 404, Message: "Data not found"}
		}
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to get data"}
	}

	return service, nil
}

func (r *ServiceRepositoryImpl) Create(ctx *fiber.Ctx, db *gorm.DB, service *models.Service) (*models.Service, *libs.ErrorResponse) {

	var prevService *models.Service
	queryPrev := db.Where("name = ?", service.Name).Preload("ServiceTerms").First(&prevService)
	if queryPrev.Error == nil {
		prevService.Price = service.Price
		prevService.Image = service.Image
		prevService.BaseModel.Deleted_at = nil
		prevService.Description = service.Description
		prevService.BaseModel.Is_deleted = 0

		newServiceTerm := make([]models.ServiceTerm, 0)
		for _, serviceTerm := range service.ServiceTerms {
			serviceTerm.Service_id = prevService.Id.String()
			newServiceTerm = append(newServiceTerm, serviceTerm)
		}

		db.Model(&models.ServiceTerm{}).Where("service_id = ?", prevService.Id).Delete(&models.ServiceTerm{})
		db.Model(&models.ServiceTerm{}).CreateInBatches(newServiceTerm, len(newServiceTerm))
		prevService.ServiceTerms = newServiceTerm
		if err := db.Model(&models.Service{}).Where("id = ?", prevService.Id).Updates(prevService).Update("is_deleted", 0).Error; err != nil {
			return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to create data"}
		}
		return prevService, nil
	}
	query := db.Create(&service)

	if query.Error != nil {
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to create data"}
	}

	return service, nil
}

func (r *ServiceRepositoryImpl) Delete(ctx *fiber.Ctx, db *gorm.DB) (*models.Service, *libs.ErrorResponse) {
	var serviceDeleted *models.Service

	query := db.Model(&models.Service{}).Where("id = ? and is_deleted = 0", ctx.Params("id"))

	if query.Error != nil {
		if errors.Is(query.Error, gorm.ErrRecordNotFound) {
			return nil, &libs.ErrorResponse{Status: 404, Message: "Data not found"}
		}
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to delete data"}
	}

	now := time.Now()
	query.Update("is_deleted", 1).Update("deleted_at", now)

	return serviceDeleted, nil
}

func (r *ServiceRepositoryImpl) Update(ctx *fiber.Ctx, db *gorm.DB, service *models.Service) (*models.Service, *libs.ErrorResponse) {

	query := db.Where("id = ? and is_deleted = 0", ctx.Params("id"))

	if query.Error != nil {
		if errors.Is(query.Error, gorm.ErrRecordNotFound) {
			return nil, &libs.ErrorResponse{Status: 404, Message: "Data not found"}
		}
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to update data"}
	}

	db.Model(&models.ServiceTerm{}).Where("service_id = ?", service.Id).Delete(&models.ServiceTerm{})
	query.Updates(service)

	return service, nil
}

func (r *ServiceRepositoryImpl) FindManyByIds(ctx *fiber.Ctx, db *gorm.DB, ids []string) ([]models.Service, *libs.ErrorResponse) {
	var services []models.Service

	query := db.Where("id in (?) and is_deleted = 0", ids).Find(&services)

	if query.Error != nil {
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to get data"}
	}

	return services, nil
}

func (r *ServiceRepositoryImpl) CountData(ctx *fiber.Ctx, db *gorm.DB) (int64, *libs.ErrorResponse) {

	var count int64

	query := db.Model(&models.Service{}).Where("is_deleted = 0").Count(&count)

	if query.Error != nil {
		return 0, &libs.ErrorResponse{Status: 500, Message: "Failed to get data"}
	}

	return count, nil
}
