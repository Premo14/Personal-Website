package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/premo14/personal-website/backend/controllers"
)

// WelcomeRoutes routes for a welcome message
func WelcomeRoutes(router fiber.Router) {
	router.Get("/welcome-message", controllers.GetWelcomeMessage)
	router.Put("/welcome-message", controllers.UpdateWelcomeMessage)
}
