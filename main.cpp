#include <iostream>


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

    while (true) {

        writeToLog();
        std::this_thread::sleep_for(std::chrono::seconds(10));
    }
    
    return 0;
}