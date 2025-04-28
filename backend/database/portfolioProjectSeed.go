package database

import (
	"errors"
	"log"

	"github.com/premo14/personal-website/backend/models"
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

func SeedPortfolioProjects() error {
	var project models.PortfolioProject
	result := DB.First(&project)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			log.Println("🌱 Seeding initial PortfolioProject...")

			initialProject := models.PortfolioProject{
				Title:       "Example Project",
				Tools:       datatypes.JSON(`["Go", "React", "Docker"]`),
				Description: "This is an example project",
				SourceLink:  "https://github.com/premo14/",
				LiveLink:    "https://premsanity.com",
			}

			if err := DB.Create(&initialProject).Error; err != nil {
				return err
			}

			log.Println("✅ PortfolioProject seeded successfully!")
			return nil
		}
		return result.Error
	}

	log.Println("⚡ PortfolioProject already exists, skipping seeding.")
	return nil
}
