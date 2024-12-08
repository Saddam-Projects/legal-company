package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/services/dtos"
	"github.com/saddam-satria/legal-be/services/handlers"
	"gorm.io/gorm"
)

type ReferenceController interface {
	FindAll(ctx *fiber.Ctx) error
	FindOne(ctx *fiber.Ctx) error
	Update(ctx *fiber.Ctx) error
}
type ReferenceControllerImpl struct {
	referenceHandler handlers.ReferenceHandler
	db               *gorm.DB
}

func NewReferenceController(
	referenceHandler handlers.ReferenceHandler,
	db *gorm.DB,
) ReferenceController {
	return &ReferenceControllerImpl{
		referenceHandler: referenceHandler,
		db:               db,
	}
}

func (r *ReferenceControllerImpl) FindAll(ctx *fiber.Ctx) error {
	reference, err := r.referenceHandler.FindAll(ctx, r.db)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(reference)
	return nil
}

func (r *ReferenceControllerImpl) FindOne(ctx *fiber.Ctx) error {

	reference, err := r.referenceHandler.FindOne(ctx, r.db)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(reference)
	return nil
}

func (r *ReferenceControllerImpl) Update(ctx *fiber.Ctx) error {
	var dt dtos.ReferenceDTO

	if err := ctx.BodyParser(&dt); err != nil {
		ctx.Status(400).JSON(err.Error())
		return nil
	}

	reference, err := r.referenceHandler.Update(ctx, r.db, &dt)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(reference)
	return nil
}
