package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/premo14/personal-website/backend/database"
	"log"
)

func main() {
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Backend is running")
	})

	log.Fatal(app.Listen(":8080"))
}
