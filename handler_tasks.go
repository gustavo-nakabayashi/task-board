package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/google/uuid"

	"github.com/gustavo-nakabayashi/golang-http/internal/database"
)

func HandleCreateTask(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Name        string    `json:"name"`
		Description string    `json:"description"`
		Status      string    `json:"status"`
		Icon        int32     `json:"icon"`
		BoardID     uuid.UUID `json:"board_id"`
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

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(task)
}
