package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/services/dtos"
	"github.com/saddam-satria/legal-be/services/handlers"
)

type ClientLogoController interface {
	Create(ctx *fiber.Ctx) error
	FindAll(ctx *fiber.Ctx) error
	FindOne(ctx *fiber.Ctx) error
	Update(ctx *fiber.Ctx) error
	Delete(ctx *fiber.Ctx) error
}

type ClientLogoControllerImpl struct {
	clientLogoHandler handlers.ClientLogoHandler
}

func NewClientLogoController(
	clientLogoHandler handlers.ClientLogoHandler,
) ClientLogoController {
	return &ClientLogoControllerImpl{
		clientLogoHandler: clientLogoHandler,
	}
}

func (g *ClientLogoControllerImpl) Create(ctx *fiber.Ctx) error {
	var dt dtos.ClientLogoDto
	if err := ctx.BodyParser(&dt); err != nil {
		ctx.Status(400).JSON(err.Error())
		return nil
	}

	clientLogo, err := g.clientLogoHandler.Create(ctx, &dt)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(clientLogo)
	return nil
}

func (g *ClientLogoControllerImpl) FindAll(ctx *fiber.Ctx) error {
	clientLogos, err := g.clientLogoHandler.FindAll(ctx)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(clientLogos)
	return nil
}

func (g *ClientLogoControllerImpl) FindOne(ctx *fiber.Ctx) error {
	clientLogo, err := g.clientLogoHandler.FindOne(ctx)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(clientLogo)
	return nil
}

func (g *ClientLogoControllerImpl) Update(ctx *fiber.Ctx) error {
	var dt dtos.ClientLogoDto
	if err := ctx.BodyParser(&dt); err != nil {
		ctx.Status(400).JSON(err.Error())
		return nil
	}

	clientLogo, err := g.clientLogoHandler.Update(ctx, &dt)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(clientLogo)
	return nil
}

func (g *ClientLogoControllerImpl) Delete(ctx *fiber.Ctx) error {
	clientLogo, err := g.clientLogoHandler.Delete(ctx)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(clientLogo)
	return nil
}
