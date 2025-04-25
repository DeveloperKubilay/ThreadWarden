#include <iostream>
#include "./Modules/httplib.h"

int main() {
    httplib::Server svr;
    svr.Post("/", [](const httplib::Request &req, httplib::Response &res) {
        std::cout << "Received POST request with body: " << req.body << std::endl;
        res.set_content("OK", "text/plain");
    });

    std::cout << "Starting HTTP server on port 8080..." << std::endl;
    svr.listen("0.0.0.0", 8080);
}