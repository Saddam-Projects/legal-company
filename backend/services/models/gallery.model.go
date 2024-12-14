package models

type Gallery struct {
	Image
}

func (*Gallery) TableName() string {
	return "gallery"
}
