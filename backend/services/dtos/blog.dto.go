package dtos

import "mime/multipart"

type BlogDTO struct {
	Title       string                `form:"title"`
	Content     string                `form:"content"`
	File        *multipart.FileHeader `form:"file" binding:"omitempty"`
	Category    string                `form:"category"`
	Author      string                `form:"author"`
	Keywords    string                `form:"keywords" binding:"omitempty"`
	Description string                `form:"description" binding:"omitempty"`
	Slug        string                `form:"slug" binding:"omitempty"`
}
