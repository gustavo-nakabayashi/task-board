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
	w.Header().Set("Content-Type", "application/json")
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

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusNoContent)
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

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(board)
}

func ReturnErrorWithMessage(w http.ResponseWriter, statusCode int, message string) {
	w.WriteHeader(statusCode)
	w.Header().Set("Content-Type", "application/json")
	response := map[string]string{"error": "Invalid board ID"}
	json.NewEncoder(w).Encode(response)
}
