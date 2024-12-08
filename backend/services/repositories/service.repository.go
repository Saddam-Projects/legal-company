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
}

type ServiceRepositoryImpl struct {
}

func NewServiceRepository() ServiceRepository {
	return &ServiceRepositoryImpl{}
}
func (r *ServiceRepositoryImpl) FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.Service, *libs.ErrorResponse) {
	var services []models.Service
	query := db.Where("is_deleted = 0").Preload("ServiceTerms", "is_deleted = 0").Order("created_at DESC")

	k := ctx.Query("k")

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

	if err := db.Where("name = ?", service.Name).First(&models.Service{}).Error; err == nil {
		return nil, &libs.ErrorResponse{Status: 400, Message: "Service name already exists"}
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
