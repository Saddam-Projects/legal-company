package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/services/dtos"
	"github.com/saddam-satria/legal-be/services/handlers"
)

type BannerController interface {
	Create(ctx *fiber.Ctx) error
	FindAll(ctx *fiber.Ctx) error
	FindOne(ctx *fiber.Ctx) error
	Update(ctx *fiber.Ctx) error
	Delete(ctx *fiber.Ctx) error
}

type BannerControllerImpl struct {
	bannerHandler handlers.BannerHandler
}

func NewBannerController(
	bannerHandler handlers.BannerHandler,
) BannerController {
	return &BannerControllerImpl{
		bannerHandler: bannerHandler,
	}
}

func (g *BannerControllerImpl) Create(ctx *fiber.Ctx) error {
	var dt dtos.FileUploadDTO
	if err := ctx.BodyParser(&dt); err != nil {
		ctx.Status(400).JSON(err.Error())
		return nil
	}

	clientLogo, err := g.bannerHandler.Create(ctx, &dt)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(clientLogo)
	return nil
}

func (g *BannerControllerImpl) FindAll(ctx *fiber.Ctx) error {
	clientLogos, err := g.bannerHandler.FindAll(ctx)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(clientLogos)
	return nil
}

func (g *BannerControllerImpl) FindOne(ctx *fiber.Ctx) error {
	clientLogo, err := g.bannerHandler.FindOne(ctx)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(clientLogo)
	return nil
}

func (g *BannerControllerImpl) Update(ctx *fiber.Ctx) error {
	var dt dtos.FileUploadDTO
	if err := ctx.BodyParser(&dt); err != nil {
		ctx.Status(400).JSON(err.Error())
		return nil
	}

	clientLogo, err := g.bannerHandler.Update(ctx, &dt)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(clientLogo)
	return nil
}

func (g *BannerControllerImpl) Delete(ctx *fiber.Ctx) error {
	clientLogo, err := g.bannerHandler.Delete(ctx)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(clientLogo)
	return nil
}
