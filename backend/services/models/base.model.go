package models

import (
	"time"

	"github.com/google/uuid"
)

type BaseModel struct {
	Id         uuid.UUID  `json:"id" gorm:"column:id;primaryKey;type:uuid;default:gen_random_uuid()"`
	Is_deleted int        `json:"is_deleted" gorm:"column:is_deleted;default:0"`
	Created_at time.Time  `json:"created_at" gorm:"column:created_at;autoCreateTime:milli"`
	Updated_at *time.Time `json:"updated_at" gorm:"column:updated_at;autoUpdateTime:milli"`
	Deleted_at *time.Time `json:"-" gorm:"column:deleted_at;default:null"`
}
