package dtos

type OrderDTO struct {
	Name       string   `json:"name" binding:"required"`
	Email      string   `json:"email" binding:"required"`
	Phone      string   `json:"phone" binding:"required"`
	OrderItems []string `json:"order_items"`
	Message    *string  `json:"message" binding:"omitempty"`
}
