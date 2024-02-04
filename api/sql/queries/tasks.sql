-- name: CreateTask :one
INSERT INTO tasks (id, board_id, created_at, updated_at, name, description, icon, status)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *;

-- name: DeleteTask :exec
DELETE FROM tasks WHERE id = $1;

-- name: UpdateTask :one
UPDATE tasks
SET name=$2, description=$3, icon=$4, status=$5
WHERE id=$1
RETURNING *;

-- name: GetTask :one
SELECT *
FROM tasks
WHERE id = $1;

-- name: GetTasksFromBoard :many
SELECT *
FROM tasks
WHERE board_id = $1;
