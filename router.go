package main

import (
	"net/http"
)

func NewRouter() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("/ping", HandlePingPong)

	mux.HandleFunc("/boards/", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			HandleGetBoard(w, r)
    case http.MethodDelete:
      HandleDeleteBoard(w, r)
    case http.MethodPut:
      HandleUpdateBoard(w, r)
		default:
			w.WriteHeader(http.StatusNotFound)
		}
	})

	mux.HandleFunc("/boards", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodPost:
			HandleCreateBoard(w, r)
		default:
			w.WriteHeader(http.StatusNotFound)
		}
	})

  mux.HandleFunc("/tasks", func(w http.ResponseWriter, r *http.Request){
    if r.Method != http.MethodPost {
			w.WriteHeader(http.StatusNotFound)
    }

    HandleCreateTask(w, r)
  })

	return mux
}
