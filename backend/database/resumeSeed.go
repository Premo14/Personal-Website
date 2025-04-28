package database

import (
	"errors"
	"log"

	"github.com/premo14/personal-website/backend/models"
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

func SeedResume() error {
	var resume models.Resume
	result := DB.First(&resume)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			log.Println("🌱 Seeding initial Resume...")

			initial := models.Resume{
				ProfessionalSummary: "SEEDED CONTENT. All contents were from initial seed and need to be updated.",
				TechnicalSkills: datatypes.JSON(`{
					"languages": "Go, JavaScript, TypeScript",
					"frameworks_libraries": "React, Fiber, Express",
					"databases": "PostgreSQL, MongoDB",
					"cloud": "AWS, GCP",
					"devops": "Docker, Terraform",
					"utilities": "GitHub Actions, Postman"
				}`),
				ProfessionalExperience: datatypes.JSON(`[]`),
				Projects:               datatypes.JSON(`[]`),
				Education:              datatypes.JSON(`[]`),
			}

			if err := DB.Create(&initial).Error; err != nil {
				return err
			}

			log.Println("✅ Resume seeded successfully!")
			return nil
		}
		return result.Error
	}

	log.Println("⚡ Resume already exists, skipping seeding.")
	return nil
}
