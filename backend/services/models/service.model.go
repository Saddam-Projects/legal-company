package models

type Service struct {
	BaseModel
	Name        string  `json:"name" gorm:"column:name"`
	Price       float64 `json:"price" gorm:"column:price"`
	Description string  `json:"description" gorm:"column:description"`
	Image       *string `json:"image" gorm:"column:image"`

	ServiceTerms []ServiceTerm `json:"service_terms" gorm:"foreignKey:service_id"`
}

func (*Service) TableName() string {
	return "service"
}

type ServiceTerm struct {
	BaseModel
	TermName   string   `json:"term_name" gorm:"column:term_name"`
	Service_id string   `json:"service_id" gorm:"column:service_id"`
	Service    *Service `json:"service" gorm:"foreignKey:service_id;"`
}

func (*ServiceTerm) TableName() string {
	return "service_term"
}
