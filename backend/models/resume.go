package models

import (
	"gorm.io/datatypes"
	"gorm.io/gorm"
	"time"
)

type Resume struct {
	ID        uint           `gorm:"primaryKey"`
	Content   datatypes.JSON `gorm:"type:jsonb"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
