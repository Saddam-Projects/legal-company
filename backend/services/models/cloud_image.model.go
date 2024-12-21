package models

type CloudImage struct {
	BaseModel
	Url *string `json:"url" gorm:"column:url"`
}

func (*CloudImage) TableName() string {
	return "cloud_image"
}
