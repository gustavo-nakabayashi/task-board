package main

import (
  "fmt"
  "log"
  "net/http"
  "sync"
)

type counter struct {
  mux sync.Mutex
  n int
}

func (c *counter) ServeHTTP(w http.ResponseWriter, r *http.Request) {
  c.mux.Lock()
  c.n++
  fmt.Fprintf(w, "counter = %d\n", c.n)
  c.mux.Unlock()
}

func main() {
  http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, you've teste bla: %s\n", r.URL.Path)
  })

  http.Handle("/counter", new(counter))

  log.Fatal(http.ListenAndServe("localhost:8000", nil))
}
