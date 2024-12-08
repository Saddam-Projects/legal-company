package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/libs"
	"github.com/saddam-satria/legal-be/services/dtos"
	"github.com/saddam-satria/legal-be/services/handlers"
	"gorm.io/gorm"
)

type ServiceTermController interface {
	Update(ctx *fiber.Ctx) error
	Create(ctx *fiber.Ctx) error
	Delete(ctx *fiber.Ctx) error
}

type ServiceTermControllerImpl struct {
	serviceTermHandler handlers.ServiceTermHandler
	db                 *gorm.DB
}

func NewServiceTermController(
	serviceTermHandler handlers.ServiceTermHandler,
	db *gorm.DB,
) ServiceTermController {
	return &ServiceTermControllerImpl{
		serviceTermHandler: serviceTermHandler,
		db:                 db,
	}
}

func (s *ServiceTermControllerImpl) Create(ctx *fiber.Ctx) error {
	var dt dtos.ServiceTermDTO

	if err := ctx.BodyParser(&dt); err != nil {
		ctx.Status(400).JSON(err.Error())
		return nil
	}

	serviceTerm, err := s.serviceTermHandler.Create(ctx, s.db, &dt)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(serviceTerm)
	return nil
}

func (s *ServiceTermControllerImpl) Update(ctx *fiber.Ctx) error {
	var dt dtos.ServiceTermDTO

	if err := ctx.BodyParser(&dt); err != nil {
		ctx.Status(400).JSON(err.Error())
		return nil
	}

	serviceTerm, err := s.serviceTermHandler.Update(ctx, s.db, &dt)

	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(serviceTerm)
	return nil
}

func (s *ServiceTermControllerImpl) Delete(ctx *fiber.Ctx) error {

	if err := s.serviceTermHandler.Delete(ctx, s.db); err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(libs.SuccessResponse{
		Status:  200,
		Message: "Success delete data",
		Data:    nil,
	})
	return nil
}
