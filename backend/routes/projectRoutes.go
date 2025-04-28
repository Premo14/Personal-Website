package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/premo14/personal-website/backend/controllers"
)

// ProjectRoutes routes for projects
func ProjectRoutes(router fiber.Router) {
	router.Get("/projects", controllers.GetProjects)
	router.Get("/projects/:id", controllers.GetProject)
	router.Post("/projects", controllers.CreateProject)
	router.Put("/projects", controllers.UpdateProjects)
	router.Post("/projects/bulk", controllers.BulkCreateProjects)
	router.Delete("/projects/:id", controllers.DeleteProject)
}
