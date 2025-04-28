package controllers

import (
	"encoding/json"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/premo14/personal-website/backend/database"
	"github.com/premo14/personal-website/backend/models"
)

// GetTechStack GET /tech-stack
func GetTechStack(c *fiber.Ctx) error {
	var techStack models.TechStack
	if err := database.DB.First(&techStack).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to retrieve tech stack",
		})
	}
	return c.JSON(techStack)
}

// CreateTool POST /tech-stack
func CreateTool(c *fiber.Ctx) error {
	var input models.Tool
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid JSON input",
		})
	}

	if input.Name == "" || input.Link == "" || input.Icon == "" || len(input.Categories) == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Name, Link, Icon, and Categories are required",
		})
	}

	var techStack models.TechStack
	if err := database.DB.First(&techStack).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to retrieve tech stack",
		})
	}

	var tools []models.Tool
	if err := json.Unmarshal(techStack.Tools, &tools); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to parse tech stack tools",
		})
	}

	for _, existingTool := range tools {
		for _, existingCategory := range existingTool.Categories {
			for _, inputCategory := range input.Categories {
				if strings.EqualFold(existingTool.Name, input.Name) && existingCategory == inputCategory {
					return c.Status(fiber.StatusConflict).JSON(fiber.Map{
						"error": "Tool already exists for category: " + inputCategory,
					})
				}
			}
		}
	}

	tools = append(tools, input)

	updatedTools, err := json.Marshal(tools)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to serialize updated tools",
		})
	}

	techStack.Tools = updatedTools
	if err := database.DB.Save(&techStack).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to update tech stack",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Tool added successfully",
	})
}

// UpdateTool PUT /tech-stack/:name
func UpdateTechStack(c *fiber.Ctx) error {
	var input struct {
		Tools []models.Tool `json:"tools"`
	}

	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid JSON input",
		})
	}

	var techStack models.TechStack
	if err := database.DB.First(&techStack).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to retrieve tech stack",
		})
	}

	// Serialize the incoming tools array to JSON
	updatedTools, err := json.Marshal(input.Tools)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to serialize updated tools",
		})
	}

	// Overwrite the Tools field completely
	techStack.Tools = updatedTools

	if err := database.DB.Save(&techStack).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to update tech stack",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Tech stack updated successfully",
	})
}

// DeleteTool DELETE /tech-stack/:name
func DeleteTool(c *fiber.Ctx) error {
	nameParam := c.Params("name")

	var techStack models.TechStack
	if err := database.DB.First(&techStack).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to retrieve tech stack",
		})
	}

	var tools []models.Tool
	if err := json.Unmarshal(techStack.Tools, &tools); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to parse tech stack tools",
		})
	}

	// Filter out tool
	newTools := make([]models.Tool, 0)
	found := false
	for _, tool := range tools {
		if !strings.EqualFold(tool.Name, nameParam) {
			newTools = append(newTools, tool)
		} else {
			found = true
		}
	}

	if !found {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Tool not found",
		})
	}

	updatedTools, err := json.Marshal(newTools)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to serialize updated tools",
		})
	}

	techStack.Tools = updatedTools
	if err := database.DB.Save(&techStack).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to update tech stack",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Tool deleted successfully",
	})
}

// BulkCreateTools POST /tech-stack/bulk
func BulkCreateTools(c *fiber.Ctx) error {
	var input []models.Tool
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid JSON input",
		})
	}

	if len(input) == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "No tools provided",
		})
	}

	var techStack models.TechStack
	if err := database.DB.First(&techStack).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to retrieve tech stack",
		})
	}

	var tools []models.Tool
	if err := json.Unmarshal(techStack.Tools, &tools); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to parse tech stack tools",
		})
	}

	for _, newTool := range input {
		// Check for duplicate before adding
		for _, existingTool := range tools {
			for _, existingCategory := range existingTool.Categories {
				for _, inputCategory := range newTool.Categories {
					if strings.EqualFold(existingTool.Name, newTool.Name) && existingCategory == inputCategory {
						return c.Status(fiber.StatusConflict).JSON(fiber.Map{
							"error": "Tool already exists for category: " + inputCategory,
						})
					}
				}
			}
		}
		tools = append(tools, newTool)
	}

	updatedTools, err := json.Marshal(tools)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to serialize updated tools",
		})
	}

	techStack.Tools = updatedTools
	if err := database.DB.Save(&techStack).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to update tech stack",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Tools added successfully",
	})
}
