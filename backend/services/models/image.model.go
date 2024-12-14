package models

type Image struct {
	BaseModel
	Image string `json:"image" gorm:"column:image;type:text"`
}
