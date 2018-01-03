var http = require('http');
var url = require('url');
var querystring = require('querystring');
var module = require('./dbModule');

var server = http.createServer(function(request, response) {
    var query = url.parse(request.url).query;
    var username = querystring.parse(query)['username'];
    var password = querystring.parse(query)['password'];

    var result = module.authenticateUser(username, password);
    
    response.writeHead(200,{"Content-Type": "text/html"});
    response.write("<html><body><center><h3>" + result +"</h3></center></body></html>");
    response.end();
});

server.listen(3000);
console.log("Server started, listening on port 3000");
