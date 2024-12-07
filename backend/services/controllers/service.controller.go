package controllers

import (
	"errors"
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/services/dtos"
	"github.com/saddam-satria/legal-be/services/handlers"
	"gorm.io/gorm"
)

type ServiceController interface {
	FindAll(ctx *fiber.Ctx) error
	Create(ctx *fiber.Ctx) error
	Update(ctx *fiber.Ctx) error
	Delete(ctx *fiber.Ctx) error
	FindById(ctx *fiber.Ctx) error
}
type ServiceControllerImpl struct {
	serviceHandler handlers.ServiceHandler
	db             *gorm.DB
}

func NewServiceController(
	serviceHandler handlers.ServiceHandler,
	db *gorm.DB,
) ServiceController {
	return &ServiceControllerImpl{
		serviceHandler: serviceHandler,
		db:             db,
	}
}

func (s *ServiceControllerImpl) FindAll(ctx *fiber.Ctx) error {
	services, err := s.serviceHandler.FindAll(ctx, s.db)

	if err != nil {
		ctx.Status(400).JSON(err)
		return errors.New(err.Message)
	}

	ctx.Status(200).JSON(services)
	return nil
}

func (s *ServiceControllerImpl) Create(ctx *fiber.Ctx) error {
	var dt dtos.ServiceDTO
	if err := ctx.BodyParser(&dt); err != nil {
		ctx.Status(400).JSON(err)
		return errors.New(err.Error())
	}

	service, err := s.serviceHandler.Create(ctx, s.db, &dt)

	if err != nil {
		ctx.Status(400).JSON(err)
		return errors.New(err.Message)
	}

	ctx.Status(200).JSON(service)
	return nil
}

func (s *ServiceControllerImpl) Update(ctx *fiber.Ctx) error {
	var dt dtos.ServiceDTO
	if err := ctx.BodyParser(&dt); err != nil {
		ctx.Status(400).JSON(err)
		return errors.New(err.Error())
	}

	service, err := s.serviceHandler.Update(ctx, s.db, &dt)

	if err != nil {
		ctx.Status(400).JSON(err)
		return errors.New(err.Message)
	}

	ctx.Status(200).JSON(service)
	return nil
}

func (s *ServiceControllerImpl) Delete(ctx *fiber.Ctx) error {
	service, err := s.serviceHandler.Delete(ctx, s.db)

	fmt.Println(err)
	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return errors.New(err.Message)
	}

	ctx.Status(200).JSON(service)
	return nil
}

func (s *ServiceControllerImpl) FindById(ctx *fiber.Ctx) error {
	service, err := s.serviceHandler.FindById(ctx, s.db, ctx.Params("id"))

	if err != nil {
		ctx.Status(400).JSON(err)
		return errors.New(err.Message)
	}

	ctx.Status(200).JSON(service)
	return nil

}
