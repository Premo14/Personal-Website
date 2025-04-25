package database

import (
	"errors"
	"github.com/premo14/personal-website/backend/models"
	"gorm.io/datatypes"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")

	dsn := "host=" + dbHost +
		" user=" + dbUser +
		" password=" + dbPassword +
		" dbname=" + dbName +
		" port=" + dbPort +
		" sslmode=disable TimeZone=UTC"

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	DB = db

	sqlDB, err := DB.DB()
	if err != nil {
		log.Fatal("Failed to get sql.DB from gorm DB:", err)
	}

	err = sqlDB.Ping()
	if err != nil {
		log.Fatal("Database connection failed:", err)
	}

	log.Println("✅ Successfully connected to the database!")

	err = DB.AutoMigrate(&models.Resume{})
	if err != nil {
		log.Fatal("Failed to auto-migrate Resume model:", err)
	}

	var existing models.Resume
	result := DB.First(&existing)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		log.Println("No resume found, creating initial empty resume...")

		initial := models.Resume{
			Content: datatypes.JSON(`{}`),
		}

		if err := DB.Create(&initial).Error; err != nil {
			log.Fatal("Failed to seed resume:", err)
		}

		log.Println("✅ Seeded initial resume.")
	}

}
