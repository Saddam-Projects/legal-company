package handlers

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/libs"
	"github.com/saddam-satria/legal-be/services/dtos"
	"github.com/saddam-satria/legal-be/services/models"
	"github.com/saddam-satria/legal-be/services/repositories"
	"gorm.io/gorm"
)

type OrderHandler interface {
	Create(ctx *fiber.Ctx, db *gorm.DB, dt *dtos.OrderDTO) (order *models.Order, err *libs.ErrorResponse)
	FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.Order, *libs.ErrorResponse)
	FindOne(ctx *fiber.Ctx, db *gorm.DB) (*models.Order, *libs.ErrorResponse)
}
type OrderHandlerImpl struct {
	orderRepository    repositories.OrderRepository
	serviceRepository  repositories.ServiceRepository
	customerRepository repositories.CustomerRepository
}

func NewOrderHandler(
	orderRepository repositories.OrderRepository,
	serviceRepository repositories.ServiceRepository,
	customerRepository repositories.CustomerRepository,
) OrderHandler {
	return &OrderHandlerImpl{
		orderRepository:    orderRepository,
		serviceRepository:  serviceRepository,
		customerRepository: customerRepository,
	}
}

func (h *OrderHandlerImpl) Create(ctx *fiber.Ctx, db *gorm.DB, dt *dtos.OrderDTO) (order *models.Order, err *libs.ErrorResponse) {

	defer func() {
		if err != nil {
			db.Rollback()
		}
	}()

	services, err := h.serviceRepository.FindManyByIds(ctx, db, dt.OrderItems)

	if err != nil {
		return nil, err
	}

	newCustomer := models.Customer{
		Name:  dt.Name,
		Email: dt.Email,
		Phone: dt.Phone,
	}

	var customer *models.Customer

	customerId := ""

	prevCustomer, err := h.customerRepository.FindEmailAndPhone(ctx, db, dt.Email, dt.Phone)

	if err == nil {
		customerId = prevCustomer.Id.String()
	}

	if customerId == "" {
		customer, err = h.customerRepository.Create(ctx, db, &newCustomer)

		if err != nil {
			return nil, err
		}
		customerId = customer.Id.String()
	}

	totalPrice := 0

	fmt.Println(dt.Message)
	newOrderItems := make([]models.OrderItem, 0)
	newOrder := models.Order{
		Customer_id: customerId,
		Description: dt.Message,
	}
	for _, service := range services {
		totalPrice += int(service.Price)

		newOrderItems = append(newOrderItems, models.OrderItem{
			Service_id: service.Id.String(),
			Order_id:   newOrder.Id.String(),
		})
	}

	newOrder.OrderItems = newOrderItems
	newOrder.Total_price = float64(totalPrice)

	order, err = h.orderRepository.Create(ctx, db, &newOrder)

	if err != nil {
		return nil, err
	}

	return &newOrder, nil
}

func (h *OrderHandlerImpl) FindAll(ctx *fiber.Ctx, db *gorm.DB) ([]models.Order, *libs.ErrorResponse) {

	orders, err := h.orderRepository.FindAll(ctx, db)

	if err != nil {
		return nil, err
	}

	return orders, nil
}

func (h *OrderHandlerImpl) FindOne(ctx *fiber.Ctx, db *gorm.DB) (*models.Order, *libs.ErrorResponse) {

	order, err := h.orderRepository.FindOne(ctx, db)

	if err != nil {
		return nil, err
	}

	return order, nil
}
