package models

type Reference struct {
	BaseModel
	Company_phone string  `json:"company_phone" gorm:"column:company_phone"`
	Company_email string  `json:"company_email" gorm:"column:company_email"`
	Company_logo  *string `json:"company_logo" gorm:"column:company_logo"`
	Address       string  `json:"address" gorm:"column:address"`
	Address_lat   string  `json:"address_lat" gorm:"column:address_lat"`
	Address_long  string  `json:"address_long" gorm:"column:address_long"`
	Company_name  string  `json:"company_name" gorm:"column:company_name"`
}

func (*Reference) TableName() string {
	return "references"
}
