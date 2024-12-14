package repositories

import (
	"errors"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/libs"
	"github.com/saddam-satria/legal-be/services/models"
	"gorm.io/gorm"
)

type ClientLogoRepository interface {
	FindOne(ctx *fiber.Ctx, db *gorm.DB, id string) (*models.ClientLogo, *libs.ErrorResponse)
	FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.ClientLogo, *libs.ErrorResponse)
	Create(ctx *fiber.Ctx, db *gorm.DB, clientLogo *models.ClientLogo) (*models.ClientLogo, *libs.ErrorResponse)
	Update(ctx *fiber.Ctx, db *gorm.DB, clientLogo *models.ClientLogo) (*models.ClientLogo, *libs.ErrorResponse)
	Delete(ctx *fiber.Ctx, db *gorm.DB, clientLogo *models.ClientLogo) (*models.ClientLogo, *libs.ErrorResponse)
}

type ClientLogoRepositoryImpl struct{}

func NewClientLogoRepository() ClientLogoRepository {
	return &ClientLogoRepositoryImpl{}
}

func (r *ClientLogoRepositoryImpl) FindOne(ctx *fiber.Ctx, db *gorm.DB, id string) (*models.ClientLogo, *libs.ErrorResponse) {
	var clientLogo *models.ClientLogo

	query := db.Where("id = ? and is_deleted = 0", id).First(&clientLogo)

	if query.Error != nil {
		if errors.Is(query.Error, gorm.ErrRecordNotFound) {
			return nil, &libs.ErrorResponse{Status: 404, Message: "Data not found"}
		}
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to get data"}
	}

	return clientLogo, nil
}

func (r *ClientLogoRepositoryImpl) FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.ClientLogo, *libs.ErrorResponse) {
	var client_logos []models.ClientLogo

	query := db.Where("is_deleted = 0").Find(&client_logos)

	if query.Error != nil {
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to get data"}
	}

	return client_logos, nil
}

func (r *ClientLogoRepositoryImpl) Create(ctx *fiber.Ctx, db *gorm.DB, clientLogo *models.ClientLogo) (*models.ClientLogo, *libs.ErrorResponse) {
	query := db.Create(&clientLogo)
	if query.Error != nil {
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to create data"}
	}

	return clientLogo, nil
}

func (r *ClientLogoRepositoryImpl) Update(ctx *fiber.Ctx, db *gorm.DB, clientLogo *models.ClientLogo) (*models.ClientLogo, *libs.ErrorResponse) {
	query := db.Where("id = ? and is_deleted = 0", ctx.Params("id"))

	if query.Error != nil {
		if errors.Is(query.Error, gorm.ErrRecordNotFound) {
			return nil, &libs.ErrorResponse{Status: 404, Message: "Data not found"}
		}
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to update data"}
	}

	query.Updates(clientLogo)

	return clientLogo, nil
}

func (r *ClientLogoRepositoryImpl) Delete(ctx *fiber.Ctx, db *gorm.DB, clientLogo *models.ClientLogo) (*models.ClientLogo, *libs.ErrorResponse) {
	query := db.Where("id = ? and is_deleted = 0", ctx.Params("id"))

	if query.Error != nil {
		if errors.Is(query.Error, gorm.ErrRecordNotFound) {
			return nil, &libs.ErrorResponse{Status: 404, Message: "Data not found"}
		}
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to update data"}
	}
	now := time.Now()
	clientLogo.Is_deleted = 1
	clientLogo.Deleted_at = &now

	query.Updates(clientLogo)

	return clientLogo, nil
}
