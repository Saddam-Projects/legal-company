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

type BlogRepository interface {
	FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.Blog, *libs.ErrorResponse)
	FindById(ctx *fiber.Ctx, db *gorm.DB, id string) (*models.Blog, *libs.ErrorResponse)
	Create(ctx *fiber.Ctx, db *gorm.DB, blog *models.Blog) (*models.Blog, *libs.ErrorResponse)
	Update(ctx *fiber.Ctx, db *gorm.DB, blog *models.Blog) (*models.Blog, *libs.ErrorResponse)
	Delete(ctx *fiber.Ctx, db *gorm.DB) (*models.Blog, *libs.ErrorResponse)
	FindBySlug(ctx *fiber.Ctx, db *gorm.DB, slug string) (*models.Blog, *libs.ErrorResponse)
}

type BlogRepositoryImpl struct{}

func NewBlogRepository() BlogRepository {
	return &BlogRepositoryImpl{}
}

func (*BlogRepositoryImpl) FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.Blog, *libs.ErrorResponse) {
	var blogs []models.Blog

	limit := 100
	offset := 0

	k := ctx.Query("keyword")
	query := db.Where("is_deleted = 0").Preload("Category")
	category := ctx.Query("category")

	if category != "" {
		query.Where("category_id = ?", category)
	}

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

	if k != "" {
		query.Where("title like ? OR content like ? OR author like ?", "%"+k+"%", "%"+k+"%", "%"+k+"%")
	}

	query.Order("created_at DESC").Limit(limit).Offset(offset).Find(&blogs)

	if query.Error != nil {
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to get data"}
	}

	return blogs, nil
}

func (*BlogRepositoryImpl) FindById(ctx *fiber.Ctx, db *gorm.DB, id string) (*models.Blog, *libs.ErrorResponse) {
	var blog *models.Blog

	query := db.Where("id = ? and is_deleted = 0", id).Preload("Category").First(&blog)

	if query.Error != nil {
		if errors.Is(query.Error, gorm.ErrRecordNotFound) {
			return nil, &libs.ErrorResponse{Status: 404, Message: "Data not found"}
		}
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to get data"}
	}

	return blog, nil
}

func (*BlogRepositoryImpl) Create(ctx *fiber.Ctx, db *gorm.DB, blog *models.Blog) (*models.Blog, *libs.ErrorResponse) {
	var category *models.Category

	queryCategory := db.Where("category_name = ?", blog.Category.Name).First(&category)

	if err := db.Model(&models.Blog{}).Where("slug = ? and is_deleted = 0", blog.Slug).First(&models.Blog{}); err == nil {
		return nil, &libs.ErrorResponse{Status: 400, Message: "Slug already exists"}
	}

	if queryCategory.Error != nil {
		newCategory := models.Category{
			Name: blog.Category.Name,
		}
		db.Create(&newCategory)

		category = &newCategory
	}

	blog.Category = *category

	query := db.Create(&blog)
	if query.Error != nil {
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to create data"}
	}
	return blog, nil
}

func (*BlogRepositoryImpl) Update(ctx *fiber.Ctx, db *gorm.DB, blog *models.Blog) (*models.Blog, *libs.ErrorResponse) {
	query := db.Where("id = ? and is_deleted = 0", ctx.Params("id"))

	if query.Error != nil {
		if errors.Is(query.Error, gorm.ErrRecordNotFound) {
			return nil, &libs.ErrorResponse{Status: 404, Message: "Data not found"}
		}
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to update data"}
	}

	var category *models.Category

	queryCategory := db.Where("category_name = ?", blog.Category.Name).First(&category)

	if queryCategory.Error != nil {
		newCategory := models.Category{
			Name: blog.Category.Name,
		}
		db.Create(&newCategory)

		category = &newCategory
	}

	blog.Category = *category
	query.Updates(blog)

	return blog, nil
}

func (*BlogRepositoryImpl) Delete(ctx *fiber.Ctx, db *gorm.DB) (*models.Blog, *libs.ErrorResponse) {
	var blogDeleted *models.Blog

	query := db.Model(&models.Blog{}).Where("id = ? and is_deleted = 0", ctx.Params("id")).First(&blogDeleted)

	if query.Error != nil {
		if errors.Is(query.Error, gorm.ErrRecordNotFound) {
			return nil, &libs.ErrorResponse{Status: 404, Message: "Data not found"}
		}
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to delete data"}
	}

	now := time.Now()

	blogDeleted.Is_deleted = 1
	blogDeleted.Deleted_at = &now
	db.Updates(blogDeleted)

	return blogDeleted, nil
}

func (*BlogRepositoryImpl) FindBySlug(ctx *fiber.Ctx, db *gorm.DB, slug string) (*models.Blog, *libs.ErrorResponse) {
	var blog *models.Blog

	query := db.Where("slug = ? and is_deleted = 0", slug).Preload("Category").First(&blog)

	if query.Error != nil {
		if errors.Is(query.Error, gorm.ErrRecordNotFound) {
			return nil, &libs.ErrorResponse{Status: 404, Message: "Data not found"}
		}
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to get data"}

	}

	return blog, nil
}
