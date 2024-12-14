package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/libs"
	"github.com/saddam-satria/legal-be/services/dtos"
	"github.com/saddam-satria/legal-be/services/models"
	"github.com/saddam-satria/legal-be/services/repositories"
	"gorm.io/gorm"
)

type CustomerHandler interface {
	FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.Customer, *libs.ErrorResponse)
	FindOne(ctx *fiber.Ctx, db *gorm.DB) (*models.Customer, *libs.ErrorResponse)
	Create(ctx *fiber.Ctx, db *gorm.DB, dt *dtos.CustomerDTO) (*models.Customer, *libs.ErrorResponse)
	Update(ctx *fiber.Ctx, db *gorm.DB, customer *dtos.CustomerDTO) (*models.Customer, *libs.ErrorResponse)
	Delete(ctx *fiber.Ctx, db *gorm.DB) (*models.Customer, *libs.ErrorResponse)
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

func (c *CustomerHandlerImpl) Create(ctx *fiber.Ctx, db *gorm.DB, dt *dtos.CustomerDTO) (*models.Customer, *libs.ErrorResponse) {

	customer, err := c.customerRepository.Create(ctx, db, &models.Customer{
		Name:  dt.Name,
		Email: dt.Email,
		Phone: dt.Phone,
	})

	if err != nil {
		return nil, err
	}

	return customer, nil
}

func (c *CustomerHandlerImpl) Update(ctx *fiber.Ctx, db *gorm.DB, customer *dtos.CustomerDTO) (*models.Customer, *libs.ErrorResponse) {

	id := ctx.Params("id")

	currentCostumer, errCurrentCostumer := c.customerRepository.FindById(ctx, db, id)

	if errCurrentCostumer != nil {
		return nil, errCurrentCostumer
	}

	currentCostumer.Name = customer.Name
	currentCostumer.Email = customer.Email
	currentCostumer.Phone = customer.Phone

	updatedCostumer, err := c.customerRepository.Update(ctx, db, currentCostumer)

	if err != nil {
		return nil, err
	}

	return updatedCostumer, nil
}

func (c *CustomerHandlerImpl) Delete(ctx *fiber.Ctx, db *gorm.DB) (*models.Customer, *libs.ErrorResponse) {

	customer, err := c.customerRepository.Delete(ctx, db)

	if err != nil {
		return nil, err
	}

	return customer, nil
}
