package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/google/uuid"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"

	"github.com/gustavo-nakabayashi/golang-http/internal/database"
)

type apiConfig struct {

	DB *database.Queries
}

func handleCreateBoard(dbQueries *database.Queries, ctx context.Context) (database.Board, error) {
	board, err := dbQueries.CreateBoard(
		ctx,
		database.CreateBoardParams{
			ID:          uuid.New(),
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
			Name:        "My first board",
			Description: "This is my first board",
		})

	if err != nil {
		return database.Board{}, err
	}

	return board, nil
}

func main() {

  godotenv.Load(".env")


	ctx := context.Background()

	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("PORT is not set")
	}

	dbUrl := os.Getenv("DB_URL")
	if dbUrl == "" {
		log.Fatal("DB_URL is not set")
	}

	db, err := sql.Open("postgres", dbUrl)
	if err != nil {
		log.Fatal("Could not connect to DB", err)
	}
	defer db.Close()

	dbQueries := database.New(db)

	http.HandleFunc("/ping", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "pong")
	})

	http.HandleFunc("/boards", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			fmt.Fprintf(w, "GET Still under development")
		case http.MethodPost:
			board, err := handleCreateBoard(dbQueries, ctx)
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				fmt.Fprintf(w, "Error creating board: %s", err)
			}
			fmt.Fprintf(w, "%s", board)
		}
	})

	log.Fatal(http.ListenAndServe("localhost:"+port, nil))

  fmt.Println("Server running on port", port)
}
