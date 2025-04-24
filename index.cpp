#include <iostream>
#include <fstream>
#include <chrono>
#include <thread>
#include <string>
#include <ctime>

void writeToLog() {
    std::ofstream logFile("log.txt", std::ios::out); 
    if (logFile.is_open()) {
        logFile << getCurrentTimestamp() << " - selam" << std::endl;
        logFile.close();
        std::cout << "Wrote 'selam' to log.txt" << std::endl;
    } else {
        std::cerr << "Error: Could not open log.txt for writing" << std::endl;
    }
}

int main() {
        httplib::Server svr;
        svr.Post("/", [](const httplib::Request &req, httplib::Response &res) {
            std::cout << "Received POST request with body: " << req.body << std::endl;
            res.set_content("OK", "text/plain");
        });
    
        // Start server
        std::cout << "Starting HTTP server on port 8080..." << std::endl;
        svr.listen("0.0.0.0", 8080);
    

    while (true) {

        writeToLog();
        std::this_thread::sleep_for(std::chrono::seconds(10));
    }
    
    return 0;

}