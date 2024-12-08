package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/libs"
	"github.com/saddam-satria/legal-be/services/dtos"
	"github.com/saddam-satria/legal-be/services/models"
	"github.com/saddam-satria/legal-be/services/repositories"
	"gorm.io/gorm"
)

type ServiceTermHandler interface {
	Create(ctx *fiber.Ctx, db *gorm.DB, serviceTerm *dtos.ServiceTermDTO) (*models.ServiceTerm, *libs.ErrorResponse)
	Update(ctx *fiber.Ctx, db *gorm.DB, serviceTerm *dtos.ServiceTermDTO) (*models.ServiceTerm, *libs.ErrorResponse)
	Delete(ctx *fiber.Ctx, db *gorm.DB) *libs.ErrorResponse
}

type ServiceTermHandlerImpl struct {
	serviceTermRepository repositories.ServiceTermRepository
	serviceRepository     repositories.ServiceRepository
}

func NewServiceTermHandler(
	serviceTermRepository repositories.ServiceTermRepository,
	serviceRepository repositories.ServiceRepository,
) ServiceTermHandler {
	return &ServiceTermHandlerImpl{
		serviceTermRepository: serviceTermRepository,
		serviceRepository:     serviceRepository,
	}
}

func (s *ServiceTermHandlerImpl) Create(ctx *fiber.Ctx, db *gorm.DB, serviceTerm *dtos.ServiceTermDTO) (*models.ServiceTerm, *libs.ErrorResponse) {

	service, err := s.serviceRepository.FindById(ctx, db, serviceTerm.ServiceId)

	if err != nil {
		return nil, &libs.ErrorResponse{Status: 404, Message: "Data not found"}
	}

	newServiceTerm := &models.ServiceTerm{
		Service_id: service.Id.String(),
		TermName:   serviceTerm.Term,
	}

	newServiceTerm, err = s.serviceTermRepository.Create(ctx, db, newServiceTerm)

	if err != nil {
		return nil, err
	}

	return newServiceTerm, nil
}

func (s *ServiceTermHandlerImpl) Update(ctx *fiber.Ctx, db *gorm.DB, serviceTerm *dtos.ServiceTermDTO) (*models.ServiceTerm, *libs.ErrorResponse) {

	prevServiceTerm, err := s.serviceTermRepository.FindOne(ctx, db, ctx.Params("id"))

	if err != nil {
		return nil, err
	}

	prevServiceTerm.TermName = serviceTerm.Term

	prevServiceTerm, err = s.serviceTermRepository.Update(ctx, db, prevServiceTerm)

	if err != nil {
		return nil, err
	}

	return prevServiceTerm, nil
}

func (s *ServiceTermHandlerImpl) Delete(ctx *fiber.Ctx, db *gorm.DB) *libs.ErrorResponse {
	return s.serviceTermRepository.Delete(ctx, db)
}
