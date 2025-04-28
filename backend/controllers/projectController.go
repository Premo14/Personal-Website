package controllers

import (
	"encoding/json"
	"errors"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/premo14/personal-website/backend/database"
	"github.com/premo14/personal-website/backend/models"
	"gorm.io/gorm"
)

// GetProjects GET /projects
func GetProjects(c *fiber.Ctx) error {
	var projects []models.PortfolioProject
	if err := database.DB.Find(&projects).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to retrieve projects",
		})
	}
	return c.JSON(projects)
}

// GetProject GET /projects/:id
func GetProject(c *fiber.Ctx) error {
	idParam := c.Params("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid project ID",
		})
	}

	var project models.PortfolioProject
	if err := database.DB.First(&project, uint(id)).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"error": "Project not found",
			})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to retrieve project",
		})
	}

	return c.JSON(project)
}

// CreateProject POST /projects
func CreateProject(c *fiber.Ctx) error {
	var input models.PortfolioProject
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid JSON input",
		})
	}

	if input.Title == "" || input.Description == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Title and Description are required",
		})
	}

	if err := database.DB.Create(&input).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to create project",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(input)
}

// UpdateProjects PUT /projects
func UpdateProjects(c *fiber.Ctx) error {
	var incomingProjects []models.PortfolioProject

	if err := c.BodyParser(&incomingProjects); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid JSON input",
		})
	}

	if len(incomingProjects) == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "No projects provided",
		})
	}

	// ⚡ Convert tools array into JSON
	for i, project := range incomingProjects {
		toolsJSON, err := json.Marshal(project.Tools)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to serialize project tools",
			})
		}
		incomingProjects[i].Tools = toolsJSON
	}

	// Delete old projects cleanly
	if err := database.DB.Session(&gorm.Session{AllowGlobalUpdate: true}).Delete(&models.PortfolioProject{}).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to clear old projects",
		})
	}

	// Save all new projects
	if err := database.DB.Create(&incomingProjects).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to create new projects",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Projects updated successfully",
	})
}

// DeleteProject DELETE /projects/:id
func DeleteProject(c *fiber.Ctx) error {
	idParam := c.Params("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid project ID",
		})
	}

	if err := database.DB.Delete(&models.PortfolioProject{}, uint(id)).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to delete project",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Project deleted successfully",
	})
}

// BulkCreateProjects POST /projects/bulk
func BulkCreateProjects(c *fiber.Ctx) error {
	var projects []models.PortfolioProject

	if err := c.BodyParser(&projects); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid JSON input",
		})
	}

	if len(projects) == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "No projects provided",
		})
	}

	for _, project := range projects {
		if project.Title == "" || project.Description == "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Each project must have a Title and Description",
			})
		}
	}

	if err := database.DB.Create(&projects).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to create projects",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(projects)
}
