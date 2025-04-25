# ramdb Project

## Overview
The `ramdb` project is a simple HTTP server implemented in Go that utilizes worker goroutines to process incoming requests. It demonstrates how to handle concurrent processing using channels and goroutines in Go.

## Project Structure
```
ramdb
├── go.mod
├── worker
│   └── worker.go
├── main.go
└── README.md
```

## Files

- **go.mod**: This file defines the module and its dependencies.
- **worker/worker.go**: Contains the implementation of worker functionality, including the `WorkerMessage` type and the `spawnWorker` function.
- **main.go**: The entry point of the application, which sets up the HTTP server and manages worker goroutines.

## Usage
1. Ensure you have Go installed on your machine.
2. Clone the repository or download the project files.
3. Navigate to the project directory.
4. Run `go mod tidy` to install the necessary dependencies.
5. Start the server by running `go run main.go`.
6. Send a POST request to `http://localhost:8080/api` with a JSON body containing the data to be processed.

## Example Request
```json
{
    "data": 42
}
```

## Contributing
Feel free to submit issues or pull requests if you have suggestions or improvements for the project.