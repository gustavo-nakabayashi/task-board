package main_test

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
	"testing"

	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"

	"github.com/gustavo-nakabayashi/task-board/api/internal/database"
)

var board database.Board

func TestMain(m *testing.M) {
	boardBody := database.CreateBoardParams{
		Name:        "board 1",
		Description: "description 1",
	}

	boardBodyJson, err := json.Marshal(boardBody)
	if err != nil {
		log.Fatal(err)
	}

	res, err := http.Post("http://localhost:8000/api/boards", "application/json", bytes.NewBuffer(boardBodyJson))
	if err != nil {
		log.Fatal(err)
	}

	defer res.Body.Close()
	json.NewDecoder(res.Body).Decode(&board)
	code := m.Run()
	os.Exit(code)
}

func TestPingPong(t *testing.T) {
	res, err := http.Get("http://localhost:8000/api/ping")
	if err != nil {
		panic(err)
	}

	defer res.Body.Close()
	body, err := io.ReadAll(res.Body)
	if err != nil {
		panic(err)
	}

	if string(body) != "pong" {
		t.Errorf("Body is not pong")
	}
}

func TestAddTask(t *testing.T) {
	type TaskResponse struct {
		Name        string
		Description string
		Status      string
		Icon        int32
		BoardID     uuid.UUID
	}

	// Arrange
	payload := TaskResponse{
		BoardID:     board.ID,
		Name:        "task 1",
		Description: "description 1",
		Icon:        1,
		Status:      "wont_do",
	}

	jsonBody, err := json.Marshal(payload)
	if err != nil {
		return
	}

	// Act
	res, err := http.Post("http://localhost/api/tasks", "application/json", bytes.NewBuffer(jsonBody))
	if err != nil {
		panic(err)
	}
	defer res.Body.Close()

	var task TaskResponse
	if err := json.NewDecoder(res.Body).Decode(&task); err != nil {
		log.Fatal("erro", err)
	}

	if res.Status != "200 OK" {
		t.Errorf("Status is not 200 OK")
	}

	assert.EqualValues(t, payload, task)
}
