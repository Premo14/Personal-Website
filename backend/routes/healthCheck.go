package routes

import "github.com/gofiber/fiber/v2"

// HealthCheck route for checking if the backend is running
func HealthCheck(router fiber.Router) {
	router.Get("/health", func(c *fiber.Ctx) error { return c.SendString("Backend is running") })
}
