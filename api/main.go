package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	_ "github.com/lib/pq"

	"github.com/gustavo-nakabayashi/task-board/api/internal/database"
)

var DbQueries *database.Queries

func main() {

	port := os.Getenv("BACKEND_PORT")
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

	DbQueries = database.New(db)

	router := NewRouter()

	log.Println("Server running on port", port)
	log.Fatal(http.ListenAndServe("0.0.0.0:"+port, router))

}
