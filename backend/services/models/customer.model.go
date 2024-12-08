package models

type Customer struct {
	BaseModel
	Name  string `json:"name" gorm:"column:name"`
	Email string `json:"email" gorm:"column:email"`
	Phone string `json:"phone" gorm:"column:phone"`

	Order []Order `json:"order" gorm:"foreignKey:customer_id"`
}

func (*Customer) TableName() string {
	return "customer"
}
