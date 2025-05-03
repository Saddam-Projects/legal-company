package models

type CloudImage struct {
	BaseModel
	Url *string `json:"url" gorm:"column:url"`
	Alt *string `json:"alt" gorm:"column:alt"`
}

func (*CloudImage) TableName() string {
	return "cloud_image"
}
