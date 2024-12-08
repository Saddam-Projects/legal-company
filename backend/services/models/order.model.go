package models

type Order struct {
	BaseModel
	Total_price float64     `json:"total_price" gorm:"column:total_price"`
	Customer_id string      `json:"customer_id" gorm:"column:customer_id"`
	Customer    *Customer   `json:"customer" gorm:"foreignKey:customer_id"`
	Description *string     `json:"description" gorm:"column:description"`
	OrderItems  []OrderItem `json:"order_items" gorm:"foreignKey:order_id"`
}

func (*Order) TableName() string {
	return "order"
}

type OrderItem struct {
	BaseModel
	Order_id   string   `json:"order_id" gorm:"column:order_id"`
	Order      *Order   `json:"order" gorm:"foreignKey:order_id;"`
	Service_id string   `json:"service_id" gorm:"column:service_id"`
	Service    *Service `json:"service" gorm:"foreignKey:service_id;"`
}

func (*OrderItem) TableName() string {
	return "order_item"
}
