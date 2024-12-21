package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/libs"
	"github.com/saddam-satria/legal-be/services/dtos"
	"github.com/saddam-satria/legal-be/services/models"
	"github.com/saddam-satria/legal-be/services/repositories"
	"gorm.io/gorm"
)

type BlogHandler interface {
	FindAll(ctx *fiber.Ctx) ([]models.Blog, *libs.ErrorResponse)
	FindOne(ctx *fiber.Ctx) (*models.Blog, *libs.ErrorResponse)
	Create(ctx *fiber.Ctx, dt *dtos.BlogDTO) (*models.Blog, *libs.ErrorResponse)
	Update(ctx *fiber.Ctx, dt *dtos.BlogDTO) (*models.Blog, *libs.ErrorResponse)
	Delete(ctx *fiber.Ctx) (*models.Blog, *libs.ErrorResponse)
	FindImages(ctx *fiber.Ctx) (*[]models.CloudImage, *libs.ErrorResponse)
	UploadImage(ctx *fiber.Ctx, dt *dtos.FileUploadDTO) (*models.CloudImage, *libs.ErrorResponse)
	FindCategories(ctx *fiber.Ctx) (*[]models.Category, *libs.ErrorResponse)
}

type BlogHandlerImpl struct {
	blogRepository       repositories.BlogRepository
	db                   *gorm.DB
	cloudImageRepository repositories.CloudImageRepository
	uploadLib            libs.UploadFile
	categoryRepository   repositories.CategoryRepository
}

func NewBlogHandler(
	blogRepository repositories.BlogRepository,
	db *gorm.DB,
	cloudImageRepository repositories.CloudImageRepository,
	uploadLib libs.UploadFile,
	categoryRepository repositories.CategoryRepository,

) BlogHandler {
	return &BlogHandlerImpl{
		blogRepository:       blogRepository,
		db:                   db,
		cloudImageRepository: cloudImageRepository,
		uploadLib:            uploadLib,
		categoryRepository:   categoryRepository,
	}
}

func (b *BlogHandlerImpl) FindAll(ctx *fiber.Ctx) ([]models.Blog, *libs.ErrorResponse) {

	blogs, err := b.blogRepository.FindAll(ctx, b.db)

	return blogs, err
}

func (b *BlogHandlerImpl) FindOne(ctx *fiber.Ctx) (*models.Blog, *libs.ErrorResponse) {

	blog, err := b.blogRepository.FindById(ctx, b.db, ctx.Params("id"))

	return blog, err

}

func (b *BlogHandlerImpl) Create(ctx *fiber.Ctx, dt *dtos.BlogDTO) (*models.Blog, *libs.ErrorResponse) {
	mediaUrl, err := b.uploadLib.Upload(ctx)

	if err != nil {
		return nil, err
	}

	newCategory := &models.Category{
		Name: dt.Category,
	}

	newBlog := &models.Blog{
		Title:    dt.Title,
		Content:  dt.Content,
		Cover:    mediaUrl,
		Category: *newCategory,
		Author:   dt.Author,
	}

	createdBlog, err := b.blogRepository.Create(ctx, b.db, newBlog)

	if err != nil {
		return nil, err
	}

	return createdBlog, nil
}

func (b *BlogHandlerImpl) Update(ctx *fiber.Ctx, dt *dtos.BlogDTO) (*models.Blog, *libs.ErrorResponse) {

	prevBlog, err := b.blogRepository.FindById(ctx, b.db, ctx.Params("id"))

	if err != nil {
		return nil, err
	}

	var fileName *string

	_, errFile := ctx.FormFile("file")

	if errFile == nil {
		mediaUrl, err := b.uploadLib.Upload(ctx)

		if err != nil {
			return nil, err
		}

		fileName = mediaUrl
	}

	newCategory := &models.Category{
		Name: dt.Category,
	}
	prevBlog.Title = dt.Title
	prevBlog.Content = dt.Content

	if fileName != nil {
		prevBlog.Cover = fileName
	}

	prevBlog.Category = *newCategory
	prevBlog.Author = dt.Author

	updatedBlog, err := b.blogRepository.Update(ctx, b.db, prevBlog)

	if err != nil {
		return nil, err
	}

	return updatedBlog, nil
}

func (b *BlogHandlerImpl) Delete(ctx *fiber.Ctx) (*models.Blog, *libs.ErrorResponse) {
	delete, err := b.blogRepository.Delete(ctx, b.db)

	return delete, err
}

func (b *BlogHandlerImpl) FindImages(ctx *fiber.Ctx) (*[]models.CloudImage, *libs.ErrorResponse) {

	images, err := b.cloudImageRepository.FindAll(ctx, b.db)

	return &images, err
}

func (b *BlogHandlerImpl) UploadImage(ctx *fiber.Ctx, dt *dtos.FileUploadDTO) (*models.CloudImage, *libs.ErrorResponse) {

	mediaUrl, err := b.uploadLib.Upload(ctx)

	if err != nil {
		return nil, err
	}

	cloudImage, err := b.cloudImageRepository.Create(ctx, b.db, &models.CloudImage{
		Url: mediaUrl,
	})

	return cloudImage, err
}

func (b *BlogHandlerImpl) FindCategories(ctx *fiber.Ctx) (*[]models.Category, *libs.ErrorResponse) {

	categories, err := b.categoryRepository.FindAll(ctx, b.db)

	return &categories, err
}
