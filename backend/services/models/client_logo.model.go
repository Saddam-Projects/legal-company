package models

type ClientLogo struct {
	Image
	Name *string `json:"name" gorm:"column:name"`
}

func (*ClientLogo) TableName() string {
	return "client_logo"
}
