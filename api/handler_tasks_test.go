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

type TaskResponse struct {
	Name        string
	Description string
	Status      string
	Icon        int32
	BoardID     uuid.UUID
}

var board database.Board

func getTask(id uuid.UUID) database.Task {
	res, err := http.Get("http://localhost:8000/api/tasks/" + id.String())
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()

	var task database.Task
	if err := json.NewDecoder(res.Body).Decode(&task); err != nil {
		log.Fatal("erro", err)
	}

	return task
}

func createTask() database.Task {
	taskBody := database.CreateTaskParams{
		BoardID:     board.ID,
		Name:        "task 1",
		Description: "description 1",
		Icon:        1,
		Status:      "wont_do",
	}

	taskBodyJson, err := json.Marshal(taskBody)
	if err != nil {
		log.Fatal(err)
	}

	res, err := http.Post("http://localhost:8000/api/tasks", "application/json", bytes.NewBuffer(taskBodyJson))
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()

	var task database.Task
	if err := json.NewDecoder(res.Body).Decode(&task); err != nil {
		log.Fatal("erro", err)
	}

	return task
}

func updateTask(task database.UpdateTaskParams) (statusCode int, err error) {
	taskJson, err := json.Marshal(task)
	if err != nil {
		return 0, err
	}

	req, err := http.NewRequest(http.MethodPut, "http://localhost/api/tasks/"+task.ID.String(), bytes.NewBuffer(taskJson))
	req.Header.Set("Content-Type", "application/json")
	if err != nil {
		return 0, err
	}

	client := &http.Client{}
	getResponse, err := client.Do(req)
	if err != nil {
		return 0, err
	}
	defer getResponse.Body.Close()

	return getResponse.StatusCode, nil
}

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

func TestGetTaskDoesntExistReturns404(t *testing.T) {
	// Act - Create a task
	getResponse, err := http.Get("http://localhost/api/tasks/" + uuid.New().String())
	if err != nil {
		log.Print(err)
		panic(err)
	}
	defer getResponse.Body.Close()

	var taskFound TaskResponse
	if err := json.NewDecoder(getResponse.Body).Decode(&taskFound); err != nil {
		log.Fatal("erro", err)
	}

	// Assert - Find created task
	assert.Equal(t, http.StatusNotFound, getResponse.StatusCode, "Status code should be 404")
}

func TestGetTask(t *testing.T) {
	// Arrange - Create a task
	taskToAdd := TaskResponse{
		BoardID:     board.ID,
		Name:        "task 1",
		Description: "description 1",
		Icon:        1,
		Status:      "wont_do",
	}

	jsonBody, err := json.Marshal(taskToAdd)
	if err != nil {
		return
	}

	res, err := http.Post("http://localhost/api/tasks", "application/json", bytes.NewBuffer(jsonBody))
	if err != nil {
		panic(err)
	}
	defer res.Body.Close()

	var addedTaskResponse database.Task
	if err := json.NewDecoder(res.Body).Decode(&addedTaskResponse); err != nil {
		log.Fatal("erro", err)
	}

	// Act - Create a task
	getResponse, err := http.Get("http://localhost/api/tasks/" + addedTaskResponse.ID.String())
	if err != nil {
		log.Print(err)
		panic(err)
	}
	defer getResponse.Body.Close()

	var taskFound TaskResponse
	if err := json.NewDecoder(getResponse.Body).Decode(&taskFound); err != nil {
		log.Fatal("erro", err)
	}

	// Assert - Find created task
	assert.Equal(t, getResponse.StatusCode, http.StatusOK, "Status code should be 200")
	assert.EqualValues(t, taskToAdd, taskFound, "Task found is not the same as the task added")
}

func TestUpdateTask(t *testing.T) {
	// Arrange - Create a task
	addedTask := createTask()

	// Act - Create a task
	updateParams := database.UpdateTaskParams{
		ID:          addedTask.ID,
		Name:        "task 2",
		Description: "description 2",
		Icon:        2,
		Status:      "wont_do",
	}

	status, err := updateTask(updateParams)
	if err != nil {
		log.Fatal(err)
	}

	// Assert - Find created task
	updatedTask := getTask(addedTask.ID)

	assert.Equal(t, http.StatusOK, status, "Status code should be 200")
	assert.EqualValues(t, updateParams.Name, updatedTask.Name, "Task Name found is not the same as the task added")
	assert.EqualValues(t, updateParams.Description, updatedTask.Description, "Task Description found is not the same as the task added")
	assert.EqualValues(t, updateParams.Icon, updatedTask.Icon, "Task Icon found is not the same as the task added")
	assert.EqualValues(t, updateParams.Status, updatedTask.Status, "Task Status found is not the same as the task added")
}

// func TestDeleteTask(t *testing.T) {
// 	// Arrange - Create a task
// 	addedTask := createTask()
//
// 	// Act - Create a task
// 	status, err := deleteTask(addedTask.ID)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
//
// 	// Assert - Find created task
// 	updatedTask := getTask(addedTask.ID)
//
// 	assert.Equal(t, http.StatusOK, status, "Status code should be 200")
// }
