package repositories

import (
	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/libs"
	"github.com/saddam-satria/legal-be/services/models"
	"gorm.io/gorm"
)

type CloudImageRepository interface {
	FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.CloudImage, *libs.ErrorResponse)
	Create(ctx *fiber.Ctx, db *gorm.DB, cloudImage *models.CloudImage) (*models.CloudImage, *libs.ErrorResponse)
}

type CloudImageRepositoryImpl struct{}

func NewCloudImageRepository() CloudImageRepository {
	return &CloudImageRepositoryImpl{}
}

func (c *CloudImageRepositoryImpl) FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.CloudImage, *libs.ErrorResponse) {

	var cloudImages []models.CloudImage

	if err := db.Find(&cloudImages).Error; err != nil {
		return nil, &libs.ErrorResponse{Status: 500, Message: err.Error()}
	}

	return cloudImages, nil
}

func (c *CloudImageRepositoryImpl) Create(ctx *fiber.Ctx, db *gorm.DB, cloudImage *models.CloudImage) (*models.CloudImage, *libs.ErrorResponse) {

	if err := db.Create(&cloudImage).Error; err != nil {
		return nil, &libs.ErrorResponse{Status: 500, Message: err.Error()}
	}

	return cloudImage, nil
}
