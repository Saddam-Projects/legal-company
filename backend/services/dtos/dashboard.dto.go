package dtos

type StatisticResponse struct {
	TotalCustomer int64 `json:"total_customer"`
	TotalOrder    int64 `json:"total_order"`
	TotalService  int64 `json:"total_service"`
}
