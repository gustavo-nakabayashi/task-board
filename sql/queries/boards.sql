-- name: CreateUser :one
INSERT INTO boards (id, created_at, updated_at, name, description)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

