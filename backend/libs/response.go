package libs

type ErrorResponse struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
}

type SuccessResponse struct {
	Status  int         `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

func NewErrorResponse(status int, message string) ErrorResponse {
	return ErrorResponse{
		Status:  status,
		Message: message,
	}
}

func NewSuccessResponse(status int, message string, data interface{}) SuccessResponse {
	return SuccessResponse{
		Status:  status,
		Message: message,
		Data:    data,
	}
}
