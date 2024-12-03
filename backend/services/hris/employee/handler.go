package employee

type EmployeeHandler interface {
	FindOne(id string) string
}
type EmployeeHandlerImpl struct{}

func NewEmployeeHandler() EmployeeHandler {
	return &EmployeeHandlerImpl{}
}

func (h *EmployeeHandlerImpl) FindOne(id string) string {
	return "test"
}
