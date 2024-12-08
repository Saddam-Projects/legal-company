package repositories

import (
	"errors"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/libs"
	"github.com/saddam-satria/legal-be/services/models"
	"gorm.io/gorm"
)

type OrderRepository interface {
	FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.Order, *libs.ErrorResponse)
	FindOne(ctx *fiber.Ctx, db *gorm.DB) (*models.Order, *libs.ErrorResponse)
	Create(ctx *fiber.Ctx, db *gorm.DB, order *models.Order) (*models.Order, *libs.ErrorResponse)
}

type OrderRepositoryImpl struct{}

func NewOrderRepository() OrderRepository {
	return &OrderRepositoryImpl{}
}

func (r *OrderRepositoryImpl) FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.Order, *libs.ErrorResponse) {
	var orders []models.Order

	limit := 100
	offset := 0

	k := ctx.Query("k")
	startDate := ctx.Query("start-date")
	endDate := ctx.Query("end-date")
	query := db.Where("is_deleted = 0").Preload("OrderItems").Preload("Customer")

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

	if startDate != "" {
		query.Where("created_at >= ?", startDate)
	}

	if endDate != "" {
		query.Where("created_at <= ?", endDate)
	}

	if k != "" {
		query.Where("name like ?", "%"+k+"%")
	}

	query.Order("created_at DESC").Limit(limit).Offset(offset).Find(&orders)

	return orders, nil
}

func (r *OrderRepositoryImpl) FindOne(ctx *fiber.Ctx, db *gorm.DB) (*models.Order, *libs.ErrorResponse) {
	var order *models.Order

	query := db.Where("id = ? and is_deleted = 0", ctx.Params("id")).Preload("OrderItems").Preload("Customer").First(&order)

	if query.Error != nil {
		if errors.Is(query.Error, gorm.ErrRecordNotFound) {
			return nil, &libs.ErrorResponse{Status: 404, Message: "Data not found"}
		}
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to get data"}
	}

	return order, nil
}

func (r *OrderRepositoryImpl) Create(ctx *fiber.Ctx, db *gorm.DB, order *models.Order) (*models.Order, *libs.ErrorResponse) {
	query := db.Create(order)

	if query.Error != nil {
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to create data"}
	}

	return order, nil
}
