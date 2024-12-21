package repositories

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/libs"
	"github.com/saddam-satria/legal-be/services/models"
	"gorm.io/gorm"
)

type CategoryRepository interface {
	FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.Category, *libs.ErrorResponse)
}
type CategoryRepositoryImpl struct{}

func NewCategoryRepository() CategoryRepository {
	return &CategoryRepositoryImpl{}
}

func (c *CategoryRepositoryImpl) FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.Category, *libs.ErrorResponse) {

	var categories []models.Category

	query := db.Model(&models.Category{})

	keyword := ctx.Query("keyword")
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

	if keyword != "" {
		query.Where("category_name like ?", "%"+keyword+"%")
	}

	query.Limit(limit).Offset(offset).Order("created_at DESC").Find(&categories)

	if query.Error != nil {
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to get data"}
	}

	return categories, nil
}
