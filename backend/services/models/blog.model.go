package models

type Category struct {
	BaseModel
	Name string `json:"name" gorm:"column:category_name"`
}

func (*Category) TableName() string {
	return "category"
}

type Blog struct {
	BaseModel
	Title       string  `json:"title" gorm:"column:title"`
	Content     string  `json:"content" gorm:"column:content"`
	Cover       *string `json:"cover" gorm:"column:cover"`
	Category_id string  `json:"category_id" gorm:"column:category_id"`
	Author      string  `json:"author" gorm:"column:author"`

	Category Category `json:"category" gorm:"foreignKey:category_id"`
}

func (*Blog) TableName() string {
	return "blog"
}
