package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/premo14/personal-website/backend/database"
	"github.com/premo14/personal-website/backend/routes"
	"log"
)

func main() {
	// Connect to database
	database.ConnectDB()

	// Initialize app
	app := fiber.New()

	// Cors
	app.Use(cors.New())
	//     app.Use(cors.New(cors.Config{
	//         AllowOrigins: "",
	//         AllowMethods: ""
	//     }))

	// Group routes
	api := app.Group("/api")
	v1 := api.Group("/v1")

	// Routes
	routes.HealthCheck(v1)
	routes.ResumeRoutes(v1)

	// Start server
	log.Fatal(app.Listen(":8080"))
}
