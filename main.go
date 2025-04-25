package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sync"

	// Add this import
	"github.com/gorilla/mux"
)

type ApiRequest struct {
	Data json.RawMessage `json:"data"`
}

type WorkerMessage struct {
	Value int32
	Resp  chan int32
}

var (
	workerCount = 11
	senders     []chan WorkerMessage
	wg          sync.WaitGroup
)

func spawnWorker(id int, rx chan WorkerMessage) {
	defer wg.Done()
	fmt.Printf("Worker %d started!\n", id)

	for msg := range rx {
		result := msg.Value + 1 // processing here
		fmt.Printf("Worker %d: %d + 1 = %d\n", id, msg.Value, result)
		msg.Resp <- result
	}
}

func initWorkers() {
	senders = make([]chan WorkerMessage, workerCount)
	for i := 0; i < workerCount; i++ {
		rx := make(chan WorkerMessage)
		senders[i] = rx
		wg.Add(1)
		go spawnWorker(i, rx)
	}
}

func apiHandler(w http.ResponseWriter, r *http.Request) {
	var request ApiRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	fmt.Printf("Received JSON data: %v\n", request)

	if len(senders) > 0 {
		respChan := make(chan int32)
		// Use standard json package instead of jsonparser
		var data struct {
			Value int `json:"value"`
		}
		if err := json.Unmarshal(request.Data, &data); err == nil {
			workerID := data.Value % workerCount
			msg := WorkerMessage{Value: int32(data.Value), Resp: respChan}
			senders[workerID] <- msg
			result := <-respChan
			fmt.Printf("Worker processed result: %d\n", result)
		}
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Received data successfully"))
}

func main() {
	initWorkers()
	defer func() {
		for _, sender := range senders {
			close(sender)
		}
		wg.Wait()
	}()

	router := mux.NewRouter()
	router.HandleFunc("/api", apiHandler).Methods("POST")

	fmt.Println("Starting HTTP server on http://localhost:8080")
	http.ListenAndServe(":8080", router)
}
