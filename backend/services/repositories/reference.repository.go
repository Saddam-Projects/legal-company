package repositories

import (
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/libs"
	"github.com/saddam-satria/legal-be/services/models"
	"gorm.io/gorm"
)

type ReferenceRepository interface {
	FindOne(ctx *fiber.Ctx, db *gorm.DB, id string) (*models.Reference, *libs.ErrorResponse)
	FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.Reference, *libs.ErrorResponse)
	Update(ctx *fiber.Ctx, db *gorm.DB, reference *models.Reference) (*models.Reference, *libs.ErrorResponse)
}
type ReferenceRepositoryImpl struct{}

func NewReferenceRepository() ReferenceRepository {
	return &ReferenceRepositoryImpl{}
}

func (r *ReferenceRepositoryImpl) FindOne(ctx *fiber.Ctx, db *gorm.DB, id string) (*models.Reference, *libs.ErrorResponse) {
	var reference *models.Reference

	query := db.Where("id = ? and is_deleted = 0", id).First(&reference)

	if query.Error != nil {
		if errors.Is(query.Error, gorm.ErrRecordNotFound) {
			return nil, &libs.ErrorResponse{Status: 404, Message: "Data not found"}
		}
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to get data"}
	}

	return reference, nil
}

func (r *ReferenceRepositoryImpl) Update(ctx *fiber.Ctx, db *gorm.DB, reference *models.Reference) (*models.Reference, *libs.ErrorResponse) {

	query := db.Where("id = ? and is_deleted = 0", ctx.Params("id"))

	if query.Error != nil {
		if errors.Is(query.Error, gorm.ErrRecordNotFound) {
			return nil, &libs.ErrorResponse{Status: 404, Message: "Data not found"}
		}
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to update data"}
	}

	query.Updates(reference)

	return reference, nil
}

func (r *ReferenceRepositoryImpl) FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.Reference, *libs.ErrorResponse) {

	var references []models.Reference

	query := db.Where("is_deleted = 0").Order("created_at DESC").Find(&references)

	if query.Error != nil {
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to get data"}
	}

	return references, nil
}
