package models

import (
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type TechStack struct {
	gorm.Model
	Tools datatypes.JSON `gorm:"type:jsonb" json:"tools"`
}

type Tool struct {
	Name       string   `json:"name"`
	Link       string   `json:"link"`
	Icon       string   `json:"icon"`
	Categories []string `json:"categories"`
}
