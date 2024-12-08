package repositories

import (
	"errors"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/libs"
	"github.com/saddam-satria/legal-be/services/models"
	"gorm.io/gorm"
)

type ServiceTermRepository interface {
	Create(ctx *fiber.Ctx, db *gorm.DB, serviceTerm *models.ServiceTerm) (*models.ServiceTerm, *libs.ErrorResponse)
	Update(ctx *fiber.Ctx, db *gorm.DB, serviceTerm *models.ServiceTerm) (*models.ServiceTerm, *libs.ErrorResponse)
	FindOne(ctx *fiber.Ctx, db *gorm.DB, id string) (*models.ServiceTerm, *libs.ErrorResponse)
	Delete(ctx *fiber.Ctx, db *gorm.DB) *libs.ErrorResponse
}

type ServiceTermRepositoryImpl struct{}

func NewServiceTermRepository() ServiceTermRepository {
	return &ServiceTermRepositoryImpl{}
}

func (s *ServiceTermRepositoryImpl) Create(ctx *fiber.Ctx, db *gorm.DB, serviceTerm *models.ServiceTerm) (*models.ServiceTerm, *libs.ErrorResponse) {
	query := db.Create(&serviceTerm)
	if query.Error != nil {
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to create data"}
	}
	return serviceTerm, nil
}

func (s *ServiceTermRepositoryImpl) Update(ctx *fiber.Ctx, db *gorm.DB, serviceTerm *models.ServiceTerm) (*models.ServiceTerm, *libs.ErrorResponse) {

	query := db.Where("id = ? and is_deleted = 0", ctx.Params("id"))

	if query.Error != nil {
		if errors.Is(query.Error, gorm.ErrRecordNotFound) {
			return nil, &libs.ErrorResponse{Status: 404, Message: "Data not found"}
		}
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to update data"}
	}

	query.Updates(serviceTerm)

	return serviceTerm, nil
}

func (s *ServiceTermRepositoryImpl) FindOne(ctx *fiber.Ctx, db *gorm.DB, id string) (*models.ServiceTerm, *libs.ErrorResponse) {

	serviceTerm := &models.ServiceTerm{}

	query := db.Where("id = ? and is_deleted = 0", id).First(&serviceTerm)

	if query.Error != nil {
		if errors.Is(query.Error, gorm.ErrRecordNotFound) {
			return nil, &libs.ErrorResponse{Status: 404, Message: "Data not found"}
		}
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to get data"}
	}

	return serviceTerm, nil
}

func (s *ServiceTermRepositoryImpl) Delete(ctx *fiber.Ctx, db *gorm.DB) *libs.ErrorResponse {

	query := db.Model(&models.ServiceTerm{}).Where("id = ? and is_deleted = 0", ctx.Params("id"))

	if query.Error != nil {
		if errors.Is(query.Error, gorm.ErrRecordNotFound) {
			return &libs.ErrorResponse{Status: 404, Message: "Data not found"}
		}
		return &libs.ErrorResponse{Status: 500, Message: "Failed to delete data"}
	}

	now := time.Now()
	query.Update("is_deleted", 1).Update("deleted_at", now)

	return nil
}
