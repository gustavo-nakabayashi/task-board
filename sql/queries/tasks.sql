-- name CreateTask :one
INSERT INTO tasks (id, board_id, created_at, updated_at, name, description)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;

-- name DeleteTask :exec
DELETE FROM tasks WHERE id = $1;

-- name UpdateTask :one
UPDATE tasks
SET name=$1, description=$2, emoji=$3, status=$4;

-- name GetTask :one
SELECT *
FROM tasks
WHERE id = $1;

