package routes

import "github.com/gofiber/fiber/v2"

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")
	v1 := api.Group("/v1")

	HealthCheck(v1)
	WelcomeRoutes(v1)
	ResumeRoutes(v1)
	ProjectRoutes(v1)
	TechStackRoutes(v1)
}
