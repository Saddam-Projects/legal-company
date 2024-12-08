package dtos

type ReferenceDTO struct {
	Company_phone string `json:"company_phone"`
	Company_email string `json:"company_email"`
	Company_logo  string `json:"company_logo"`
	Address       string `json:"address"`
	Address_lat   string `json:"address_lat"`
	Address_long  string `json:"address_long"`
	Company_name  string `json:"company_name"`
}
