package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"

	"github.com/gustavo-nakabayashi/golang-http/internal/database"
)

var DbQueries *database.Queries

func main() {
	godotenv.Load(".env")

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

	DbQueries = database.New(db)

	router := NewRouter()

	log.Println("Server running on port", port)
	log.Fatal(http.ListenAndServe("localhost:"+port, router))

}
