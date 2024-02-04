package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"

	"github.com/gustavo-nakabayashi/task-board/api/internal/database"
)

func HandleCreateTask(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Name        string
		Description string
		Status      string
		Icon        int32
		BoardID     uuid.UUID
	}

	params := parameters{}

	json.NewDecoder(r.Body).Decode(&params)

	task, err := DbQueries.CreateTask(r.Context(), database.CreateTaskParams{
		ID:          uuid.New(),
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
		BoardID:     params.BoardID,
		Name:        params.Name,
		Description: params.Description,
		Icon:        params.Icon,
		Status:      params.Status,
	})
	if err != nil {
		log.Print(err)
		ReturnErrorWithMessage(w, http.StatusInternalServerError, "Internal error")
	}

	json.NewEncoder(w).Encode(task)
}

func HandleDeleteTask(w http.ResponseWriter, r *http.Request) {
	taskId, err := uuid.Parse(chi.URLParam(r, "id"))
	if err != nil {
		ReturnErrorWithMessage(w, http.StatusBadRequest, "ID not valid")
	}

	if err := DbQueries.DeleteTask(r.Context(), taskId); err != nil {
		ReturnErrorWithMessage(w, http.StatusInternalServerError, "Internal error")
	}

	w.WriteHeader(http.StatusNoContent)
}

func HandleUpdateTask(w http.ResponseWriter, r *http.Request) {
	taskId, err := uuid.Parse(chi.URLParam(r, "id"))
	if err != nil {
		ReturnErrorWithMessage(w, http.StatusBadRequest, "ID not valid")
	}

	var params database.UpdateTaskParams
	json.NewDecoder(r.Body).Decode(&params)
	params.ID = taskId

	task, err := DbQueries.UpdateTask(r.Context(), params)
	if err != nil {
		ReturnErrorWithMessage(w, http.StatusInternalServerError, "Internal error")
	}

	json.NewEncoder(w).Encode(task)
}

func HandleGetTask(w http.ResponseWriter, r *http.Request) {
	taskId, err := uuid.Parse(chi.URLParam(r, "id"))
	if err != nil {
		ReturnErrorWithMessage(w, http.StatusBadRequest, "ID not valid")
	}

	task, err := DbQueries.GetTask(r.Context(), taskId)
	if err != nil {
		ReturnErrorWithMessage(w, http.StatusInternalServerError, "Internal error")
	}

	json.NewEncoder(w).Encode(task)
}
