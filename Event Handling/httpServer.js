var http = require('http');
var querystring = require('querystring');
var module = require('./dbModule');
var eventHandler = require('./eventHandlerModule');

var server = http.createServer(function(request, response) {
    var data1="";
    request.on('data', function(chunk) {
        data1 += chunk;
    });

    request.on('end', function() {
        if(request.url !== '/favicon.ico') {
            var qs = querystring.parse(data1);
            var username = qs['username'];
            var password = qs['password'];

            var result = module.authenticateUser(username, password);
            var count = eventHandler.visitorCountEvent();

            response.writeHead(200, {"Content-Type": "text/html"});
            response.write("<html><body><center><h3>" + result + "</h3><h5>Number of people visited: " + count +"</h5></center></body></html>");
            response.end();
        }
    });
});

server.listen(3000);
console.log("Server started, listening on port 3000");
