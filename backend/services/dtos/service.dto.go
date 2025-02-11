package dtos

import "mime/multipart"

type ServiceDTO struct {
	Service_name string                `form:"service_name" binding:"required"`
	Price        int64                 `form:"price" binding:"required"`
	Description  string                `form:"description" binding:"omitempty"`
	File         *multipart.FileHeader `form:"file" binding:"omitempty"`
	Terms        string                `form:"terms" binding:"required"`
}

type ServiceTermDTO struct {
	Term      string `json:"term" binding:"required"`
	ServiceId string `json:"service_id" binding:"required"`
}
