package models

import (
	"gorm.io/datatypes"
	"time"
)

type Resume struct {
	ID        uint           `gorm:"primaryKey"`
	Content   datatypes.JSON `gorm:"type:jsonb"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
