var http = require('http');
var url = require('url');
var routing = require('./routing');

http.createServer(function(request, response) {
    if(request.url === '/favicon.ico') {
        response.writeHead(200, {"Content-Type" : "image/x-icon"});
        response.end();
        return;
    }
    else {
        var url_parts = url.parse(request.url);
        routing.enableRoute(url_parts, request, response);
    }
}).listen(3000);

console.log("Server started, listening on port 3000");