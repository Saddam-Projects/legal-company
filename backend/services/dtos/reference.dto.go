package dtos

import "mime/multipart"

type ReferenceDTO struct {
	Company_phone    string                `form:"company_phone"`
	Company_email    string                `form:"company_email"`
	File             *multipart.FileHeader `form:"file" binding:"omitempty"`
	Address          string                `form:"address"`
	Address_lat      string                `form:"address_lat"`
	Address_long     string                `form:"address_long"`
	Company_name     string                `form:"company_name"`
	Company_nickname string                `form:"company_nickname"`
}
