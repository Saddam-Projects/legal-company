package repositories

import (
	"errors"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/libs"
	"github.com/saddam-satria/legal-be/services/models"
	"gorm.io/gorm"
)

type BannerRepository interface {
	FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.Banner, *libs.ErrorResponse)
	FindOne(ctx *fiber.Ctx, db *gorm.DB, id string) (*models.Banner, *libs.ErrorResponse)
	Create(ctx *fiber.Ctx, db *gorm.DB, banner *models.Banner) (*models.Banner, *libs.ErrorResponse)
	Update(ctx *fiber.Ctx, db *gorm.DB, banner *models.Banner) (*models.Banner, *libs.ErrorResponse)
	Delete(ctx *fiber.Ctx, db *gorm.DB) (*models.Banner, *libs.ErrorResponse)
}
type BannerRepositoryImpl struct{}

func NewBannerRepository() BannerRepository {
	return &BannerRepositoryImpl{}
}

func (*BannerRepositoryImpl) FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.Banner, *libs.ErrorResponse) {
	var banners []models.Banner

	query := db.Where("is_deleted = 0")

	if query.Error != nil {
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to get data"}
	}

	query.Find(&banners)

	return banners, nil
}
func (*BannerRepositoryImpl) FindOne(ctx *fiber.Ctx, db *gorm.DB, id string) (*models.Banner, *libs.ErrorResponse) {
	var banner *models.Banner
	query := db.Where("id = ? and is_deleted = 0", id).First(&banner)
	if query.Error != nil {
		if errors.Is(query.Error, gorm.ErrRecordNotFound) {
			return nil, &libs.ErrorResponse{Status: 404, Message: "Data not found"}
		}
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to get data"}
	}
	return banner, nil
}

func (*BannerRepositoryImpl) Create(ctx *fiber.Ctx, db *gorm.DB, banner *models.Banner) (*models.Banner, *libs.ErrorResponse) {
	query := db.Create(&banner)
	if query.Error != nil {
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to create data"}
	}
	return banner, nil
}

func (*BannerRepositoryImpl) Update(ctx *fiber.Ctx, db *gorm.DB, banner *models.Banner) (*models.Banner, *libs.ErrorResponse) {
	query := db.Where("id = ? and is_deleted = 0", ctx.Params("id"))

	if query.Error != nil {
		if errors.Is(query.Error, gorm.ErrRecordNotFound) {
			return nil, &libs.ErrorResponse{Status: 404, Message: "Data not found"}
		}
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to update data"}
	}

	query.Updates(banner)

	return banner, nil
}

func (*BannerRepositoryImpl) Delete(ctx *fiber.Ctx, db *gorm.DB) (*models.Banner, *libs.ErrorResponse) {
	var bannerDeleted *models.Banner

	query := db.Model(&models.Banner{}).Where("id = ? and is_deleted = 0", ctx.Params("id"))

	if query.Error != nil {
		if errors.Is(query.Error, gorm.ErrRecordNotFound) {
			return nil, &libs.ErrorResponse{Status: 404, Message: "Data not found"}
		}
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to delete data"}
	}

	now := time.Now()
	query.Update("is_deleted", 1).Update("deleted_at", now)

	return bannerDeleted, nil
}
