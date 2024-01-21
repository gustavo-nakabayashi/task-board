// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.24.0
// source: boards.sql

package database

import (
	"context"
	"time"

	"github.com/google/uuid"
)

const createBoard = `-- name: CreateBoard :one
INSERT INTO boards (id, created_at, updated_at, name, description)
VALUES ($1, $2, $3, $4, $5)
RETURNING id, created_at, updated_at, name, description
`

type CreateBoardParams struct {
	ID          uuid.UUID
	CreatedAt   time.Time
	UpdatedAt   time.Time
	Name        string
	Description string
}

func (q *Queries) CreateBoard(ctx context.Context, arg CreateBoardParams) (Board, error) {
	row := q.db.QueryRowContext(ctx, createBoard,
		arg.ID,
		arg.CreatedAt,
		arg.UpdatedAt,
		arg.Name,
		arg.Description,
	)
	var i Board
	err := row.Scan(
		&i.ID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Name,
		&i.Description,
	)
	return i, err
}
