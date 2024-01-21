-- +goose Up
CREATE TABLE tasks (
    id UUID NOT NULL,
    board_id UUID NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    name varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    icon int NOT NULL,
    status varchar(255) NOT NULL,
    CONSTRAINT fk_board_id FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE
);

-- +goose Down
DROP TABLE tasks;

