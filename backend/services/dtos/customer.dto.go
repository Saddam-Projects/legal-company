package dtos

type CustomerDTO struct {
	Name  string `json:"name" gorm:"column:name"`
	Email string `json:"email" gorm:"column:email"`
	Phone string `json:"phone" gorm:"column:phone"`
}
