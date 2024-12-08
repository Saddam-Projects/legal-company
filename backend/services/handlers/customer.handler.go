package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/libs"
	"github.com/saddam-satria/legal-be/services/models"
	"github.com/saddam-satria/legal-be/services/repositories"
	"gorm.io/gorm"
)

type CustomerHandler interface {
	FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.Customer, *libs.ErrorResponse)
	FindOne(ctx *fiber.Ctx, db *gorm.DB) (*models.Customer, *libs.ErrorResponse)
}

type CustomerHandlerImpl struct {
	customerRepository repositories.CustomerRepository
}

func NewCustomerHandler(
	customerRepository repositories.CustomerRepository,
) CustomerHandler {
	return &CustomerHandlerImpl{
		customerRepository: customerRepository,
	}
}

func (c *CustomerHandlerImpl) FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.Customer, *libs.ErrorResponse) {

	customers, err := c.customerRepository.FindAll(ctx, db)
	if err != nil {
		return nil, err
	}

	return customers, nil

}

func (c *CustomerHandlerImpl) FindOne(ctx *fiber.Ctx, db *gorm.DB) (*models.Customer, *libs.ErrorResponse) {

	customer, err := c.customerRepository.FindById(ctx, db, ctx.Params("id"))

	if err != nil {
		return nil, err
	}

	return customer, nil
}
