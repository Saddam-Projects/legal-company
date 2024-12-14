package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/libs"
	"github.com/saddam-satria/legal-be/services/dtos"
	"github.com/saddam-satria/legal-be/services/models"
	"github.com/saddam-satria/legal-be/services/repositories"
	"gorm.io/gorm"
)

type GalleryHandler interface {
	FindAll(ctx *fiber.Ctx) ([]models.Gallery, *libs.ErrorResponse)
	FindOne(ctx *fiber.Ctx) (*models.Gallery, *libs.ErrorResponse)
	Create(ctx *fiber.Ctx, dt *dtos.FileUploadDTO) (*models.Gallery, *libs.ErrorResponse)
	Update(ctx *fiber.Ctx, gallery *dtos.FileUploadDTO) (*models.Gallery, *libs.ErrorResponse)
	Delete(ctx *fiber.Ctx) (*models.Gallery, *libs.ErrorResponse)
}
type GalleryHandlerImpl struct {
	galleryRepository repositories.GalleryRepository
	db                *gorm.DB
	uploadLib         libs.UploadFile
}

func NewGalleryHandler(
	galleryRepository repositories.GalleryRepository,
	db *gorm.DB,
	uploadLib libs.UploadFile,
) GalleryHandler {
	return &GalleryHandlerImpl{
		db:                db,
		galleryRepository: galleryRepository,
		uploadLib:         uploadLib,
	}
}

func (r *GalleryHandlerImpl) FindAll(ctx *fiber.Ctx) ([]models.Gallery, *libs.ErrorResponse) {

	galleries, err := r.galleryRepository.FindAll(ctx, r.db)

	if err != nil {
		return nil, err
	}

	return galleries, nil
}

func (r *GalleryHandlerImpl) FindOne(ctx *fiber.Ctx) (*models.Gallery, *libs.ErrorResponse) {

	gallery, err := r.galleryRepository.FindOne(ctx, r.db, ctx.Params("id"))

	if err != nil {
		return nil, err
	}

	return gallery, nil
}

func (r *GalleryHandlerImpl) Create(ctx *fiber.Ctx, dt *dtos.FileUploadDTO) (*models.Gallery, *libs.ErrorResponse) {

	fileName, errFilename := r.uploadLib.Upload(ctx)

	if errFilename != nil {
		return nil, errFilename
	}

	req := &models.Gallery{
		Image: models.Image{
			Image: *fileName,
		},
	}
	gallery, err := r.galleryRepository.Create(ctx, r.db, req)

	if err != nil {
		return nil, err
	}

	return gallery, nil
}

func (r *GalleryHandlerImpl) Update(ctx *fiber.Ctx, gallery *dtos.FileUploadDTO) (*models.Gallery, *libs.ErrorResponse) {

	fileName, errFilename := r.uploadLib.Upload(ctx)

	if errFilename != nil {
		return nil, errFilename
	}

	currentGallery, err := r.galleryRepository.FindOne(ctx, r.db, ctx.Params("id"))
	if err != nil {
		return nil, err
	}

	currentGallery.Image.Image = *fileName
	updatedGallery, err := r.galleryRepository.Update(ctx, r.db, currentGallery)

	if err != nil {
		return nil, err
	}

	return updatedGallery, nil
}

func (r *GalleryHandlerImpl) Delete(ctx *fiber.Ctx) (*models.Gallery, *libs.ErrorResponse) {

	currentGallery, err := r.galleryRepository.FindOne(ctx, r.db, ctx.Params("id"))
	if err != nil {
		return nil, err
	}
	gallery, err := r.galleryRepository.Delete(ctx, r.db, currentGallery)

	if err != nil {
		return nil, err
	}

	return gallery, nil
}
