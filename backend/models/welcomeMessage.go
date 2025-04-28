package models

import "gorm.io/gorm"

type WelcomeMessage struct {
	gorm.Model
	Message string `gorm:"type:varchar(255);not null" json:"message"`
}
