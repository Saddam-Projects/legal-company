package repositories

import (
	"errors"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/libs"
	"github.com/saddam-satria/legal-be/services/models"
	"gorm.io/gorm"
)

type GalleryRepository interface {
	FindOne(ctx *fiber.Ctx, db *gorm.DB, id string) (*models.Gallery, *libs.ErrorResponse)
	FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.Gallery, *libs.ErrorResponse)
	Create(ctx *fiber.Ctx, db *gorm.DB, gallery *models.Gallery) (*models.Gallery, *libs.ErrorResponse)
	Update(ctx *fiber.Ctx, db *gorm.DB, gallery *models.Gallery) (*models.Gallery, *libs.ErrorResponse)
	Delete(ctx *fiber.Ctx, db *gorm.DB, gallery *models.Gallery) (*models.Gallery, *libs.ErrorResponse)
}

type GalleryRepositoryImpl struct{}

func NewGalleryRepository() GalleryRepository {
	return &GalleryRepositoryImpl{}
}

func (r *GalleryRepositoryImpl) FindOne(ctx *fiber.Ctx, db *gorm.DB, id string) (*models.Gallery, *libs.ErrorResponse) {
	var gallery *models.Gallery

	query := db.Where("id = ? and is_deleted = 0", id).First(&gallery)

	if query.Error != nil {
		if errors.Is(query.Error, gorm.ErrRecordNotFound) {
			return nil, &libs.ErrorResponse{Status: 404, Message: "Data not found"}
		}
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to get data"}
	}

	return gallery, nil
}

func (r *GalleryRepositoryImpl) FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.Gallery, *libs.ErrorResponse) {
	var galleries []models.Gallery

	query := db.Where("is_deleted = 0").Find(&galleries)

	if query.Error != nil {
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to get data"}
	}

	return galleries, nil
}

func (r *GalleryRepositoryImpl) Create(ctx *fiber.Ctx, db *gorm.DB, gallery *models.Gallery) (*models.Gallery, *libs.ErrorResponse) {
	query := db.Create(&gallery)
	if query.Error != nil {
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to create data"}
	}

	return gallery, nil
}

func (r *GalleryRepositoryImpl) Update(ctx *fiber.Ctx, db *gorm.DB, gallery *models.Gallery) (*models.Gallery, *libs.ErrorResponse) {
	query := db.Where("id = ? and is_deleted = 0", ctx.Params("id"))

	if query.Error != nil {
		if errors.Is(query.Error, gorm.ErrRecordNotFound) {
			return nil, &libs.ErrorResponse{Status: 404, Message: "Data not found"}
		}
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to update data"}
	}

	query.Updates(gallery)

	return gallery, nil
}

func (r *GalleryRepositoryImpl) Delete(ctx *fiber.Ctx, db *gorm.DB, gallery *models.Gallery) (*models.Gallery, *libs.ErrorResponse) {
	query := db.Where("id = ? and is_deleted = 0", ctx.Params("id"))

	if query.Error != nil {
		if errors.Is(query.Error, gorm.ErrRecordNotFound) {
			return nil, &libs.ErrorResponse{Status: 404, Message: "Data not found"}
		}
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to update data"}
	}

	now := time.Now()
	gallery.Is_deleted = 1
	gallery.Deleted_at = &now
	query.Updates(gallery)

	return gallery, nil
}
