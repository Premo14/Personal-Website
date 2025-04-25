package controllers

import (
	"encoding/json"
	"errors"
	"github.com/gofiber/fiber/v2"
	"github.com/premo14/personal-website/backend/database"
	"github.com/premo14/personal-website/backend/models"
	"gorm.io/gorm"
)

// GetResume handles GET /resume
func GetResume(c *fiber.Ctx) error {
	var resume models.Resume
	result := database.DB.First(&resume)

	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return c.Status(404).JSON(fiber.Map{"error": "Resume not found"})
		}
		return c.Status(500).JSON(fiber.Map{"error": "Internal server error"})
	}

	return c.JSON(fiber.Map{
		"resume": resume.Content,
	})
}

// UpdateResume handles PUT /resume
func UpdateResume(c *fiber.Ctx) error {
	var input map[string]interface{}
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid JSON input",
		})
	}

	var resume models.Resume
	db := database.DB

	// We assume a single resume record with ID = 1
	if err := db.First(&resume, 1).Error; err != nil {
		// If not found, create new
		jsonBytes, err := json.Marshal(input)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to serialize resume content",
			})
		}
		resume.Content = jsonBytes
		if err := db.Create(&resume).Error; err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to create resume",
			})
		}
	} else {
		// Update existing
		jsonBytes, err := json.Marshal(input)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to serialize resume content",
			})
		}
		resume.Content = jsonBytes
		if err := db.Save(&resume).Error; err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to update resume",
			})
		}
	}

	return c.JSON(fiber.Map{
		"message": "Resume updated successfully",
	})
}
