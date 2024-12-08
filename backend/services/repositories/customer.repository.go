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

type CustomerRepository interface {
	FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.Customer, *libs.ErrorResponse)
	FindById(ctx *fiber.Ctx, db *gorm.DB, id string) (*models.Customer, *libs.ErrorResponse)
	Create(ctx *fiber.Ctx, db *gorm.DB, customer *models.Customer) (*models.Customer, *libs.ErrorResponse)
	Update(ctx *fiber.Ctx, db *gorm.DB, customer *models.Customer) (*models.Customer, *libs.ErrorResponse)
	Delete(ctx *fiber.Ctx, db *gorm.DB) (*models.Customer, *libs.ErrorResponse)
	FindEmailAndPhone(ctx *fiber.Ctx, db *gorm.DB, email string, phone string) (*models.Customer, *libs.ErrorResponse)
}

type CustomerRepositoryImpl struct{}

func NewCustomerRepository() CustomerRepository {
	return &CustomerRepositoryImpl{}
}

func (*CustomerRepositoryImpl) FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.Customer, *libs.ErrorResponse) {
	var customers []models.Customer

	limit := 100
	offset := 0

	k := ctx.Query("k")
	query := db.Where("is_deleted = 0").Preload("Order")

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
		query.Where("name like ? OR phone like ? OR email like ?", "%"+k+"%", "%"+k+"%", "%"+k+"%")
	}

	query.Order("created_at DESC").Limit(limit).Offset(offset).Find(&customers)

	if query.Error != nil {
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to get data"}
	}

	return customers, nil
}

func (*CustomerRepositoryImpl) FindById(ctx *fiber.Ctx, db *gorm.DB, id string) (*models.Customer, *libs.ErrorResponse) {
	var customer *models.Customer

	query := db.Where("id = ? and is_deleted = 0", id).Preload("Order").First(&customer)

	if query.Error != nil {
		if errors.Is(query.Error, gorm.ErrRecordNotFound) {
			return nil, &libs.ErrorResponse{Status: 404, Message: "Data not found"}
		}
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to get data"}
	}

	return customer, nil
}

func (*CustomerRepositoryImpl) Create(ctx *fiber.Ctx, db *gorm.DB, customer *models.Customer) (*models.Customer, *libs.ErrorResponse) {
	query := db.Create(&customer)
	if query.Error != nil {
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to create data"}
	}
	return customer, nil
}

func (*CustomerRepositoryImpl) Update(ctx *fiber.Ctx, db *gorm.DB, customer *models.Customer) (*models.Customer, *libs.ErrorResponse) {
	query := db.Where("id = ? and is_deleted = 0", ctx.Params("id"))

	if query.Error != nil {
		if errors.Is(query.Error, gorm.ErrRecordNotFound) {
			return nil, &libs.ErrorResponse{Status: 404, Message: "Data not found"}
		}
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to update data"}
	}

	query.Updates(customer)

	return customer, nil
}

func (*CustomerRepositoryImpl) Delete(ctx *fiber.Ctx, db *gorm.DB) (*models.Customer, *libs.ErrorResponse) {
	var cuustomerDeleted *models.Customer

	query := db.Model(&models.Customer{}).Where("id = ? and is_deleted = 0", ctx.Params("id"))

	if query.Error != nil {
		if errors.Is(query.Error, gorm.ErrRecordNotFound) {
			return nil, &libs.ErrorResponse{Status: 404, Message: "Data not found"}
		}
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to delete data"}
	}

	now := time.Now()
	query.Update("is_deleted", 1).Update("deleted_at", now)

	return cuustomerDeleted, nil
}

func (*CustomerRepositoryImpl) FindEmailAndPhone(ctx *fiber.Ctx, db *gorm.DB, email string, phone string) (*models.Customer, *libs.ErrorResponse) {
	var customer *models.Customer

	query := db.Where("email = ? and phone = ? and is_deleted = 0", email, phone).First(&customer)

	if query.Error != nil {
		if errors.Is(query.Error, gorm.ErrRecordNotFound) {
			return nil, &libs.ErrorResponse{Status: 404, Message: "Data not found"}
		}
		return nil, &libs.ErrorResponse{Status: 500, Message: "Failed to get data"}
	}

	return customer, nil
}
