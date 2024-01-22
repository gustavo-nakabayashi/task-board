package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/google/uuid"

	"github.com/gustavo-nakabayashi/golang-http/internal/database"
)

func HandlePingPong(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "pong")
}

func HandleGetBoard(w http.ResponseWriter, r *http.Request) {
	id, err := uuid.Parse(r.URL.Path[len("/boards/"):])
	if err != nil {
		ReturnErrorWithMessage(w, http.StatusBadRequest, "Invalid ID")
		return
	}

	board, err := DbQueries.GetBoard(r.Context(), id)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}
	json.NewEncoder(w).Encode(board)
}

func HandleDeleteBoard(w http.ResponseWriter, r *http.Request) {
	id, err := uuid.Parse(r.URL.Path[len("/boards/"):])
	if err != nil {
		ReturnErrorWithMessage(w, http.StatusBadRequest, "Invalid ID")
		return
	}

	if err := DbQueries.DeleteBoard(r.Context(), id); err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func HandleUpdateBoard(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		ID          uuid.UUID
		Name        string `json:"name"`
		Description string `json:"description"`
	}

	params := parameters{}

	err := json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		ReturnErrorWithMessage(w, http.StatusInternalServerError, "Error decoding request body")
	}

	id, err := uuid.Parse(r.URL.Path[len("/boards/"):])
	if err != nil {
		ReturnErrorWithMessage(w, http.StatusBadRequest, "Invalid ID")
		return
	}
	params.ID = id

	board, err := DbQueries.UpdateBoard(r.Context(), database.UpdateBoardParams(params))
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(board)
}

func HandleCreateBoard(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Name        string `json:"name"`
		Description string `json:"description"`
	}

	params := parameters{}

	err := json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		ReturnErrorWithMessage(w, http.StatusInternalServerError, "Error decoding request body")
	}

	board, err := DbQueries.CreateBoard(
		r.Context(),
		database.CreateBoardParams{
			ID:          uuid.New(),
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
			Name:        params.Name,
			Description: params.Description,
		})
	if err != nil {
		ReturnErrorWithMessage(w, http.StatusInternalServerError, "Error creating board")
	}

	if err := CreateInitialTasks(r, board.ID); err != nil {
		ReturnErrorWithMessage(w, http.StatusInternalServerError, "Error creating initial tasks")
	}

	json.NewEncoder(w).Encode(board)
}

func ReturnErrorWithMessage(w http.ResponseWriter, statusCode int, message string) {
	w.WriteHeader(statusCode)
	response := map[string]string{"error": message}
	json.NewEncoder(w).Encode(response)
}

func CreateInitialTasks(r *http.Request, boardID uuid.UUID) error {
	for _, task := range generateInitialTasks(boardID) {
		_, err := DbQueries.CreateTask(r.Context(), task)
		if err != nil {
			return err
		}
	}

	return nil
}

func generateInitialTasks(boardID uuid.UUID) [4]database.CreateTaskParams {
	return [4]database.CreateTaskParams{
		{
			ID:          uuid.New(),
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
			BoardID:     boardID,
			Name:        "Task in Progress",
			Description: "",
			Icon:        1,
			Status:      "progress",
		},
		{
			ID:          uuid.New(),
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
			BoardID:     boardID,
			Name:        "Task Completed",
			Description: "",
			Icon:        1,
			Status:      "completed",
		},
		{
			ID:          uuid.New(),
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
			BoardID:     boardID,
			Name:        "Task Won't Do",
			Description: "",
			Icon:        1,
			Status:      "wont_do",
		},
		{
			ID:          uuid.New(),
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
			BoardID:     boardID,
			Name:        "Task To Do",
			Description: "Work on a Challenge on devChallenes.io, learn TypeScript.",
			Icon:        1,
			Status:      "",
		},
	}
}
