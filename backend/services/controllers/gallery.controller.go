package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/services/dtos"
	"github.com/saddam-satria/legal-be/services/handlers"
)

type GalleryController interface {
	Create(ctx *fiber.Ctx) error
	FindAll(ctx *fiber.Ctx) error
	FindOne(ctx *fiber.Ctx) error
	Update(ctx *fiber.Ctx) error
	Delete(ctx *fiber.Ctx) error
}

type GalleryControllerImpl struct {
	galleryHandler handlers.GalleryHandler
}

func NewGalleryController(
	galleryHandler handlers.GalleryHandler,
) GalleryController {
	return &GalleryControllerImpl{
		galleryHandler: galleryHandler,
	}
}

func (g *GalleryControllerImpl) Create(ctx *fiber.Ctx) error {
	var dt dtos.FileUploadDTO
	if err := ctx.BodyParser(&dt); err != nil {
		ctx.Status(400).JSON(err.Error())
		return nil
	}

	gallery, err := g.galleryHandler.Create(ctx, &dt)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(gallery)
	return nil
}

func (g *GalleryControllerImpl) FindAll(ctx *fiber.Ctx) error {
	galleries, err := g.galleryHandler.FindAll(ctx)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(galleries)
	return nil
}

func (g *GalleryControllerImpl) FindOne(ctx *fiber.Ctx) error {
	gallery, err := g.galleryHandler.FindOne(ctx)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(gallery)
	return nil
}

func (g *GalleryControllerImpl) Update(ctx *fiber.Ctx) error {
	var dt dtos.FileUploadDTO
	if err := ctx.BodyParser(&dt); err != nil {
		ctx.Status(400).JSON(err.Error())
		return nil
	}

	gallery, err := g.galleryHandler.Update(ctx, &dt)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(gallery)
	return nil
}

func (g *GalleryControllerImpl) Delete(ctx *fiber.Ctx) error {
	gallery, err := g.galleryHandler.Delete(ctx)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(gallery)
	return nil
}
