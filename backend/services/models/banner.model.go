package models

type Banner struct {
	Image
}

func (*Banner) TableName() string {
	return "banner"
}
