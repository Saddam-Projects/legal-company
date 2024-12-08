package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/libs"
	"github.com/saddam-satria/legal-be/services/dtos"
	"github.com/saddam-satria/legal-be/services/models"
	"github.com/saddam-satria/legal-be/services/repositories"
	"gorm.io/gorm"
)

type ReferenceHandler interface {
	FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.Reference, *libs.ErrorResponse)
	FindOne(ctx *fiber.Ctx, db *gorm.DB) (*models.Reference, *libs.ErrorResponse)
	Update(ctx *fiber.Ctx, db *gorm.DB, reference *dtos.ReferenceDTO) (*models.Reference, *libs.ErrorResponse)
}

type ReferenceHandlerImpl struct {
	referenceRepository repositories.ReferenceRepository
}

func NewReferenceHandler(referenceRepository repositories.ReferenceRepository) ReferenceHandler {
	return &ReferenceHandlerImpl{referenceRepository: referenceRepository}
}

func (r *ReferenceHandlerImpl) FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.Reference, *libs.ErrorResponse) {
	return r.referenceRepository.FindAll(ctx, db)
}
func (r *ReferenceHandlerImpl) FindOne(ctx *fiber.Ctx, db *gorm.DB) (*models.Reference, *libs.ErrorResponse) {
	return r.referenceRepository.FindOne(ctx, db, ctx.Params("id"))
}

func (r *ReferenceHandlerImpl) Update(ctx *fiber.Ctx, db *gorm.DB, dt *dtos.ReferenceDTO) (*models.Reference, *libs.ErrorResponse) {
	id := ctx.Params("id")

	reference, err := r.referenceRepository.FindOne(ctx, db, id)
	if err != nil {
		return nil, err
	}

	reference.Company_email = dt.Company_email
	reference.Company_phone = dt.Company_phone
	reference.Company_logo = dt.Company_logo
	reference.Address = dt.Address
	reference.Address_lat = dt.Address_lat
	reference.Address_long = dt.Address_long
	reference.Company_name = dt.Company_name

	return r.referenceRepository.Update(ctx, db, reference)
}
