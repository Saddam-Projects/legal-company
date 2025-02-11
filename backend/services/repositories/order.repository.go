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
	CreateOrderItems(ctx *fiber.Ctx, db *gorm.DB, orderItems []models.OrderItem) *libs.ErrorResponse
	CountData(ctx *fiber.Ctx, db *gorm.DB) (int64, *libs.ErrorResponse)
}

type OrderRepositoryImpl struct{}

func NewOrderRepository() OrderRepository {
	return &OrderRepositoryImpl{}
}

func (r *OrderRepositoryImpl) FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.Order, *libs.ErrorResponse) {

	orders := make([]models.Order, 0)
	k := ctx.Query("keyword")

	limit := 100
	offset := 0

	startDate := ctx.Query("start-date")
	endDate := ctx.Query("end-date")
	query := db.Where(`"order".is_deleted = 0`).Preload("OrderItems.Service").Preload("Customer")

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
		query.Joins("Customer").Where("name like ? OR phone like ? OR email like ?", "%"+k+"%", "%"+k+"%", "%"+k+"%")
	}

	if startDate != "" {
		query.Where("created_at >= ?", startDate)
	}

	if endDate != "" {
		query.Where("created_at <= ?", endDate)
	}

	query.Order("created_at DESC").Limit(limit).Offset(offset).Find(&orders)

	return orders, nil
}

func (r *OrderRepositoryImpl) FindOne(ctx *fiber.Ctx, db *gorm.DB) (*models.Order, *libs.ErrorResponse) {
	var order *models.Order

	query := db.Where("id = ? and is_deleted = 0", ctx.Params("id")).Preload("OrderItems.Service").Preload("Customer").First(&order)

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

func (r *OrderRepositoryImpl) CreateOrderItems(ctx *fiber.Ctx, db *gorm.DB, orderItems []models.OrderItem) *libs.ErrorResponse {

	query := db.CreateInBatches(orderItems, len(orderItems))

	if query.Error != nil {
		return &libs.ErrorResponse{Status: 500, Message: "Failed to create data"}
	}

	return nil
}

func (r *OrderRepositoryImpl) CountData(ctx *fiber.Ctx, db *gorm.DB) (int64, *libs.ErrorResponse) {

	var count int64

	query := db.Model(&models.Order{}).Where("is_deleted = 0").Count(&count)

	if query.Error != nil {
		return 0, &libs.ErrorResponse{Status: 500, Message: "Failed to get data"}
	}

	return count, nil
}
