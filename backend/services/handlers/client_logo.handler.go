package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/libs"
	"github.com/saddam-satria/legal-be/services/dtos"
	"github.com/saddam-satria/legal-be/services/models"
	"github.com/saddam-satria/legal-be/services/repositories"
	"gorm.io/gorm"
)

type ClientLogoHandler interface {
	FindAll(ctx *fiber.Ctx) ([]models.ClientLogo, *libs.ErrorResponse)
	FindOne(ctx *fiber.Ctx) (*models.ClientLogo, *libs.ErrorResponse)
	Create(ctx *fiber.Ctx, dt *dtos.ClientLogoDto) (*models.ClientLogo, *libs.ErrorResponse)
	Update(ctx *fiber.Ctx, clientLogo *dtos.ClientLogoDto) (*models.ClientLogo, *libs.ErrorResponse)
	Delete(ctx *fiber.Ctx) (*models.ClientLogo, *libs.ErrorResponse)
}
type ClientLogoHandlerImpl struct {
	clientLogoRepository repositories.ClientLogoRepository
	db                   *gorm.DB
	uploadLib            libs.UploadFile
}

func NewClientLogoHandler(
	clientLogoRepository repositories.ClientLogoRepository,
	db *gorm.DB,
	uploadLib libs.UploadFile,
) ClientLogoHandler {
	return &ClientLogoHandlerImpl{
		db:                   db,
		clientLogoRepository: clientLogoRepository,
		uploadLib:            uploadLib,
	}
}

func (r *ClientLogoHandlerImpl) FindAll(ctx *fiber.Ctx) ([]models.ClientLogo, *libs.ErrorResponse) {

	clientLogos, err := r.clientLogoRepository.FindAll(ctx, r.db)

	if err != nil {
		return nil, err
	}

	return clientLogos, nil
}

func (r *ClientLogoHandlerImpl) FindOne(ctx *fiber.Ctx) (*models.ClientLogo, *libs.ErrorResponse) {

	clientLogo, err := r.clientLogoRepository.FindOne(ctx, r.db, ctx.Params("id"))

	if err != nil {
		return nil, err
	}

	return clientLogo, nil
}

func (r *ClientLogoHandlerImpl) Create(ctx *fiber.Ctx, dt *dtos.ClientLogoDto) (*models.ClientLogo, *libs.ErrorResponse) {

	fileName, errFilename := r.uploadLib.Upload(ctx)

	if errFilename != nil {
		return nil, errFilename
	}

	req := &models.ClientLogo{
		Image: models.Image{
			Image: *fileName,
		},
		Name: &dt.Name,
	}
	clientLogo, err := r.clientLogoRepository.Create(ctx, r.db, req)

	if err != nil {
		return nil, err
	}

	return clientLogo, nil
}

func (r *ClientLogoHandlerImpl) Update(ctx *fiber.Ctx, clientLogo *dtos.ClientLogoDto) (*models.ClientLogo, *libs.ErrorResponse) {

	fileName, errFilename := r.uploadLib.Upload(ctx)

	if errFilename != nil {
		return nil, errFilename
	}

	currentclientLogo, err := r.clientLogoRepository.FindOne(ctx, r.db, ctx.Params("id"))
	if err != nil {
		return nil, err
	}

	currentclientLogo.Image.Image = *fileName
	currentclientLogo.Name = &clientLogo.Name
	updatedclientLogo, err := r.clientLogoRepository.Update(ctx, r.db, currentclientLogo)

	if err != nil {
		return nil, err
	}

	return updatedclientLogo, nil
}

func (r *ClientLogoHandlerImpl) Delete(ctx *fiber.Ctx) (*models.ClientLogo, *libs.ErrorResponse) {

	currentclientLogo, err := r.clientLogoRepository.FindOne(ctx, r.db, ctx.Params("id"))
	if err != nil {
		return nil, err
	}
	clientLogo, err := r.clientLogoRepository.Delete(ctx, r.db, currentclientLogo)

	if err != nil {
		return nil, err
	}

	return clientLogo, nil
}
