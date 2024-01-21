-- +goose Up

CREATE TABLE boards (
    id UUID PRIMARY KEY,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    name varchar(255) NOT NULL,
    description varchar(255) NOT NULL
);

-- +goose Down

DROP TABLE boards;
