package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/libs"
	"github.com/saddam-satria/legal-be/services/dtos"
	"github.com/saddam-satria/legal-be/services/repositories"
	"gorm.io/gorm"
)

type DashboardHandler interface {
	GetStatistic(ctx *fiber.Ctx) (*dtos.StatisticResponse, *libs.ErrorResponse)
}
type DashboardHandlerImpl struct {
	customerRepository repositories.CustomerRepository
	orderRepository    repositories.OrderRepository
	clientRepository   repositories.ClientLogoRepository
	serviceRepository  repositories.ServiceRepository
	db                 *gorm.DB
}

func NewDashboardHandler(
	customerRepository repositories.CustomerRepository,
	orderRepository repositories.OrderRepository,
	clientRepository repositories.ClientLogoRepository,
	serviceRepository repositories.ServiceRepository,
	db *gorm.DB,
) DashboardHandler {
	return &DashboardHandlerImpl{
		customerRepository: customerRepository,
		orderRepository:    orderRepository,
		clientRepository:   clientRepository,
		db:                 db,
		serviceRepository:  serviceRepository,
	}
}

func (h *DashboardHandlerImpl) GetStatistic(ctx *fiber.Ctx) (*dtos.StatisticResponse, *libs.ErrorResponse) {
	totalCustomer, err := h.customerRepository.CountData(ctx, h.db)

	if err != nil {
		return nil, err
	}
	totalService, err := h.serviceRepository.CountData(ctx, h.db)
	if err != nil {
		return nil, err
	}
	totalOrder, err := h.orderRepository.CountData(ctx, h.db)

	if err != nil {
		return nil, err
	}

	res := dtos.StatisticResponse{
		TotalCustomer: totalCustomer,
		TotalOrder:    totalOrder,
		TotalService:  totalService,
	}
	return &res, err
}
