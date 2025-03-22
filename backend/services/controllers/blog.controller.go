package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/services/dtos"
	"github.com/saddam-satria/legal-be/services/handlers"
)

type BlogController interface {
	Create(ctx *fiber.Ctx) error
	FindAll(ctx *fiber.Ctx) error
	FindOne(ctx *fiber.Ctx) error
	Update(ctx *fiber.Ctx) error
	Delete(ctx *fiber.Ctx) error
	FindImages(ctx *fiber.Ctx) error
	UploadImage(ctx *fiber.Ctx) error
	FindCategories(ctx *fiber.Ctx) error
	FindBySlug(ctx *fiber.Ctx) error
}
type BlogControllerImpl struct {
	blogHandler handlers.BlogHandler
}

func NewBlogController(blogHandler handlers.BlogHandler) BlogController {
	return &BlogControllerImpl{blogHandler: blogHandler}
}

func (b *BlogControllerImpl) Create(ctx *fiber.Ctx) error {
	var dt dtos.BlogDTO
	if err := ctx.BodyParser(&dt); err != nil {
		ctx.Status(400).JSON(err.Error())
		return nil
	}

	blog, err := b.blogHandler.Create(ctx, &dt)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(blog)
	return nil
}

func (b *BlogControllerImpl) FindAll(ctx *fiber.Ctx) error {
	blogs, err := b.blogHandler.FindAll(ctx)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(blogs)
	return nil
}

func (b *BlogControllerImpl) FindOne(ctx *fiber.Ctx) error {

	blog, err := b.blogHandler.FindOne(ctx)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(blog)
	return nil
}

func (b *BlogControllerImpl) Update(ctx *fiber.Ctx) error {
	var dt dtos.BlogDTO

	if err := ctx.BodyParser(&dt); err != nil {
		ctx.Status(400).JSON(err.Error())
		return nil
	}

	blog, err := b.blogHandler.Update(ctx, &dt)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(blog)
	return nil
}

func (b *BlogControllerImpl) Delete(ctx *fiber.Ctx) error {

	blog, err := b.blogHandler.Delete(ctx)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(blog)
	return nil
}

func (b *BlogControllerImpl) FindImages(ctx *fiber.Ctx) error {

	images, err := b.blogHandler.FindImages(ctx)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(images)
	return nil
}

func (b *BlogControllerImpl) UploadImage(ctx *fiber.Ctx) error {
	var dt dtos.FileUploadDTO

	if err := ctx.BodyParser(&dt); err != nil {
		ctx.Status(400).JSON(err.Error())
		return nil
	}
	image, err := b.blogHandler.UploadImage(ctx, &dt)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(image)
	return nil
}

func (b *BlogControllerImpl) FindCategories(ctx *fiber.Ctx) error {

	categories, err := b.blogHandler.FindCategories(ctx)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(categories)
	return nil
}

func (b *BlogControllerImpl) FindBySlug(ctx *fiber.Ctx) error {

	blog, err := b.blogHandler.FindBySlug(ctx)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(blog)
	return nil
}
