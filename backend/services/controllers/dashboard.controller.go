package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/saddam-satria/legal-be/services/handlers"
)

type DashboardController interface {
	GetStatistic(ctx *fiber.Ctx) error
}
type DashboardControllerImpl struct {
	dashboardHandler handlers.DashboardHandler
}

func NewDashboardController(
	dashboardHandler handlers.DashboardHandler,
) DashboardController {
	return &DashboardControllerImpl{
		dashboardHandler: dashboardHandler,
	}
}

func (c *DashboardControllerImpl) GetStatistic(ctx *fiber.Ctx) error {

	statistic, err := c.dashboardHandler.GetStatistic(ctx)
	if err != nil {
		ctx.Status(err.Status).JSON(err)
		return nil
	}

	ctx.Status(200).JSON(statistic)
	return nil
}
