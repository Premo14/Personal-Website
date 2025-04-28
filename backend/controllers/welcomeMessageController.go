package controllers

import (
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/premo14/personal-website/backend/database"
	"github.com/premo14/personal-website/backend/models"
	"gorm.io/gorm"
)

// GetWelcomeMessage GET /welcomeMessage
func GetWelcomeMessage(c *fiber.Ctx) error {
	var welcomeMessage models.WelcomeMessage
	if err := database.DB.First(&welcomeMessage).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"error": "Welcome message not found",
			})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to retrieve welcome message",
		})
	}

	return c.JSON(welcomeMessage)
}

// UpdateWelcomeMessage PUT /welcomeMessage
func UpdateWelcomeMessage(c *fiber.Ctx) error {
	var input models.WelcomeMessage
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid JSON input",
		})
	}

	// Basic validation
	if input.Message == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Message field is required",
		})
	}

	var welcomeMessage models.WelcomeMessage
	db := database.DB

	if err := db.First(&welcomeMessage, 1).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			input.ID = 1
			if err := db.Create(&input).Error; err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
					"error": "Failed to create welcome message",
				})
			}
			return c.Status(fiber.StatusCreated).JSON(fiber.Map{
				"message": "Welcome message created successfully",
			})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to retrieve welcome message",
		})
	}

	welcomeMessage.Message = input.Message

	if err := db.Save(&welcomeMessage).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to update welcome message",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Welcome message updated successfully",
	})
}
