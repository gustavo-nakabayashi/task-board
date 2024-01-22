-- name: CreateBoard :one
INSERT INTO boards (id, created_at, updated_at, name, description)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- name: GetBoard :one
SELECT * FROM boards WHERE id = $1;

-- name: DeleteBoard :exec
DELETE FROM boards WHERE id = $1;

-- name: UpdateBoard :one
UPDATE boards 
SET name = $2, description = $3
WHERE id = $1
RETURNING *;

