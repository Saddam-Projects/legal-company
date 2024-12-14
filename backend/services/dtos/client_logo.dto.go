package dtos

type ClientLogoDto struct {
	FileUploadDTO
	Name string `json:"name" binding:"required"`
}
