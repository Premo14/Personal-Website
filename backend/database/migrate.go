package database

import (
	"log"

	"github.com/premo14/personal-website/backend/models"
)

func MigrateDB() {
	log.Println("🚀 Starting database migrations...")

	modelsToMigrate := []interface{}{
		&models.Resume{},
		&models.PortfolioProject{},
		&models.WelcomeMessage{},
		&models.TechStack{},
	}

	if err := DB.AutoMigrate(modelsToMigrate...); err != nil {
		log.Fatalf("❌ Failed to migrate database models: %v", err)
	}

	log.Println("✅ Database models migrated successfully!")
}
