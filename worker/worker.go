package worker

import (
	"fmt"
	"sync"
)

type WorkerMessage struct {
	Value int
	Resp  chan int
}

func spawnWorker(id int, wg *sync.WaitGroup, jobs <-chan WorkerMessage) {
	defer wg.Done()
	fmt.Printf("Worker %d started!\n", id)

	for msg := range jobs {
		result := msg.Value + 1 // processing here
		fmt.Printf("Worker %d: %d + 1 = %d\n", id, msg.Value, result)
		msg.Resp <- result
	}
}