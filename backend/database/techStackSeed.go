package database

import (
	"errors"
	"github.com/premo14/personal-website/backend/models"
	"gorm.io/datatypes"
	"gorm.io/gorm"
	"log"
)

func SeedTechStack() error {
	var techStack models.TechStack
	result := DB.First(&techStack)

	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			log.Println("Seeding initial Tech Stack...")

			initial := models.TechStack{
				Tools: datatypes.JSON(`{
					"name": "Go",
					"link": "https://go.dev/",
					"icon": "../../public/logos/go.svg",
					"categories": ["Backend"]
				}`),
			}

			if err := DB.Create(&initial).Error; err != nil {
				return err
			}

			log.Println("✅ Tech Stack seeded successfully!")
			return nil
		}
		return result.Error
	}
	log.Println("⚡ Resume already exists, skipping seeding.")
	return nil
}
