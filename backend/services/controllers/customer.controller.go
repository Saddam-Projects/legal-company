package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/services/dtos"
	"github.com/saddam-satria/legal-be/services/handlers"
	"gorm.io/gorm"
)

type CustomerController interface {
	FindAll(ctx *fiber.Ctx) error
	Create(ctx *fiber.Ctx) error
	Update(ctx *fiber.Ctx) error
	FindOne(ctx *fiber.Ctx) error
	Delete(ctx *fiber.Ctx) error
}

type CustomerControllerImpl struct {
	customerHandler handlers.CustomerHandler
	db              *gorm.DB
}

func NewCustomerController(
	customerHandler handlers.CustomerHandler,
	db *gorm.DB,
) CustomerController {
	return &CustomerControllerImpl{
		customerHandler: customerHandler,
		db:              db,
	}
}

func (c *CustomerControllerImpl) FindAll(ctx *fiber.Ctx) error {

	customers, err := c.customerHandler.FindAll(ctx, c.db)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(customers)
	return nil
}

func (c *CustomerControllerImpl) FindOne(ctx *fiber.Ctx) error {

	customer, err := c.customerHandler.FindOne(ctx, c.db)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(customer)
	return nil
}

func (c *CustomerControllerImpl) Create(ctx *fiber.Ctx) error {

	var dt dtos.CustomerDTO

	if err := ctx.BodyParser(&dt); err != nil {
		ctx.Status(400).JSON(err.Error())
		return nil
	}

	customer, err := c.customerHandler.Create(ctx, c.db, &dt)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(customer)
	return nil
}

func (c *CustomerControllerImpl) Update(ctx *fiber.Ctx) error {

	var dt dtos.CustomerDTO

	if err := ctx.BodyParser(&dt); err != nil {
		ctx.Status(400).JSON(err.Error())
		return nil
	}

	customer, err := c.customerHandler.Update(ctx, c.db, &dt)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(customer)
	return nil
}

func (c *CustomerControllerImpl) Delete(ctx *fiber.Ctx) error {

	customer, err := c.customerHandler.Delete(ctx, c.db)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(customer)
	return nil
}
