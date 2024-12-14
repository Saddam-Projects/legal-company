package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/libs"
	"github.com/saddam-satria/legal-be/services/dtos"
	"github.com/saddam-satria/legal-be/services/models"
	"github.com/saddam-satria/legal-be/services/repositories"
	"gorm.io/gorm"
)

type BannerHandler interface {
	FindAll(ctx *fiber.Ctx) ([]models.Banner, *libs.ErrorResponse)
	FindOne(ctx *fiber.Ctx) (*models.Banner, *libs.ErrorResponse)
	Create(ctx *fiber.Ctx, dt *dtos.FileUploadDTO) (*models.Banner, *libs.ErrorResponse)
	Update(ctx *fiber.Ctx, clientLogo *dtos.FileUploadDTO) (*models.Banner, *libs.ErrorResponse)
	Delete(ctx *fiber.Ctx) (*models.Banner, *libs.ErrorResponse)
}
type BannerHandlerImpl struct {
	bannerRepository repositories.BannerRepository
	db               *gorm.DB
	uploadLib        libs.UploadFile
}

func NewBannerHandler(
	bannerRepository repositories.BannerRepository,
	db *gorm.DB,
	uploadLib libs.UploadFile,
) BannerHandler {
	return &BannerHandlerImpl{
		db:               db,
		bannerRepository: bannerRepository,
		uploadLib:        uploadLib,
	}
}

func (r *BannerHandlerImpl) FindAll(ctx *fiber.Ctx) ([]models.Banner, *libs.ErrorResponse) {

	clientLogos, err := r.bannerRepository.FindAll(ctx, r.db)

	if err != nil {
		return nil, err
	}

	return clientLogos, nil
}

func (r *BannerHandlerImpl) FindOne(ctx *fiber.Ctx) (*models.Banner, *libs.ErrorResponse) {

	clientLogo, err := r.bannerRepository.FindOne(ctx, r.db, ctx.Params("id"))

	if err != nil {
		return nil, err
	}

	return clientLogo, nil
}

func (r *BannerHandlerImpl) Create(ctx *fiber.Ctx, dt *dtos.FileUploadDTO) (*models.Banner, *libs.ErrorResponse) {

	fileName, errFilename := r.uploadLib.Upload(ctx)

	if errFilename != nil {
		return nil, errFilename
	}

	req := &models.Banner{
		Image: models.Image{
			Image: *fileName,
		},
	}
	clientLogo, err := r.bannerRepository.Create(ctx, r.db, req)

	if err != nil {
		return nil, err
	}

	return clientLogo, nil
}

func (r *BannerHandlerImpl) Update(ctx *fiber.Ctx, clientLogo *dtos.FileUploadDTO) (*models.Banner, *libs.ErrorResponse) {

	fileName, errFilename := r.uploadLib.Upload(ctx)

	if errFilename != nil {
		return nil, errFilename
	}

	currentclientLogo, err := r.bannerRepository.FindOne(ctx, r.db, ctx.Params("id"))
	if err != nil {
		return nil, err
	}

	currentclientLogo.Image.Image = *fileName
	updatedclientLogo, err := r.bannerRepository.Update(ctx, r.db, currentclientLogo)

	if err != nil {
		return nil, err
	}

	return updatedclientLogo, nil
}

func (r *BannerHandlerImpl) Delete(ctx *fiber.Ctx) (*models.Banner, *libs.ErrorResponse) {

	_, err := r.bannerRepository.FindOne(ctx, r.db, ctx.Params("id"))
	if err != nil {
		return nil, err
	}
	clientLogo, err := r.bannerRepository.Delete(ctx, r.db)

	if err != nil {
		return nil, err
	}

	return clientLogo, nil
}
