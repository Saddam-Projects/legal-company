package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/services/dtos"
	"github.com/saddam-satria/legal-be/services/handlers"
	"gorm.io/gorm"
)

type OrderController interface {
	Create(ctx *fiber.Ctx) error
	FindAll(ctx *fiber.Ctx) error
	FindOne(ctx *fiber.Ctx) error
}
type OrderControllerImpl struct {
	orderHandler handlers.OrderHandler
	db           *gorm.DB
}

func NewOrderController(
	orderHandler handlers.OrderHandler,
	db *gorm.DB,
) OrderController {
	return &OrderControllerImpl{
		orderHandler: orderHandler,
		db:           db,
	}
}

func (c *OrderControllerImpl) Create(ctx *fiber.Ctx) error {
	var dt dtos.OrderDTO
	if err := ctx.BodyParser(&dt); err != nil {
		ctx.Status(400).JSON(err.Error())
		return nil
	}

	order, err := c.orderHandler.Create(ctx, c.db, &dt)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(order)
	return nil
}

func (o *OrderControllerImpl) FindAll(ctx *fiber.Ctx) error {
	orders, err := o.orderHandler.FindAll(ctx, o.db)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(orders)
	return nil
}

func (o *OrderControllerImpl) FindOne(ctx *fiber.Ctx) error {
	order, err := o.orderHandler.FindOne(ctx, o.db)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(order)
	return nil
}
