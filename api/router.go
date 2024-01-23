package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)


func NewRouter() http.Handler {
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	r.Use(SetContentTypeJson)

	r.Get("/ping", HandlePingPong)

	r.Delete("/boards/{id}", HandleDeleteBoard)
	r.Get("/boards/{id}", HandleGetBoard)
	r.Get("/boards/{id}/tasks", HandleGetTasksFromBoard)
	r.Post("/boards", HandleCreateBoard)
	r.Put("/boards/{id}", HandleUpdateBoard)

	r.Post("/tasks", HandleCreateTask)

	return r
}
