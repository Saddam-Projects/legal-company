package dtos

import "mime/multipart"

type FileUploadDTO struct {
	File *multipart.FileHeader `form:"file" binding:"required"`
	Alt  string                `form:"alt" binding:"required"`
}
