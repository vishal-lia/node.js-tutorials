var fs = require('fs');
var querystring = require('querystring');
var url = require('url');
var zlib = require('zlib');
var module = require('./dbModule');

exports.display_login = function(url, request, response) {
    var data1 = "";
    request.on('data', function(chunk) {
        data1 += chunk;
    });

    request.on('end', function() {
        var qs = querystring.parse(data1);
        var username = qs['username'];
        var password = qs['password'];

        var result = module.authenticateUser(username, password);

        if(result === "Valid User") {
            fs.appendFile('./log.txt', "User " + username + " logged at " + new Date() + "\n" , function(err) {
                if(err) {
                    throw err;
                }
            });

            fs.readFile('./details.html', function(err, html) {
                if(err) {
                    throw err;
                }

                response.writeHead(200, {"Content-Type": "text/html"});
                response.write(html);
                response.end();
            });
        }
        else {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(`<html><body>
                            <center> <p>Invalid user, try again!</p>
                            <a href = 'home'>Back to login</a>
                            </center></body></html>`);
            response.end();
        }
    });
}

exports.display_signup = function(url, request, response) {
    fs.readFile('./signup.html', function(err, html) {
        if(err) {
            throw err;
        }

        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    });
}

exports.display_register = function(url, request, response) {
    var data1 = "";
    request.on('data', function(chunk) {
        data1 += chunk;
    });

    request.on('end', function() {
        var qs = querystring.parse(data1);
        var username = qs['username'];
        var password = qs['password'];
        var confirmpassword = qs['confirmpassword'];
        var address = qs['address'];

        if(password === confirmpassword) {
            var result = module.addUser(username, password, address, response);

            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(`<html><body><center><p>`
                            + result + `</p><a href='home'>Click here to login</a>
                            </center></body></html>`);
            response.end();
        }
        else {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(`<html><body><center>Password did not match with confirm password
                            <a href='signup'>Try again!</a>
                            </center></body></html>`);
            response.end();
        }
    });
}

exports.display_home = function(url, request, response) {
    fs.readFile('./login.html', function(err, html) {
        if(err) {
            throw err;
        }
        
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    });
}

exports.view_books = function(request, response) {
    fs.readFile('./books.json', function(err, json) {
        if(err) {
            throw err;
        }

        response.writeHead(200, {"Content-Type": "application/json"});
        response.end(json);
    });
}

exports.getImageResponse = function(request, response) {
    var img;

    switch(request.url) {
        case '/book1.jpg':
                        img = fs.readFileSync('./books/images/book1.jpg');
                        break;
        case '/book2.jpg':
                        img = fs.readFileSync('./books/images/book2.jpg');
                        break;
        case '/book3.jpg':
                        img = fs.readFileSync('./books/images/book3.jpg');
                        break;                        
    }

    response.writeHead(200, {"Content-Type": "image/jpg"});
    response.end(img, 'binary');
}

exports.view_book = function(request, response) {
    var query = url.parse(request.url).query;
    var ebook = querystring.parse(query)['ebook'];

    var file = fs.createReadStream('./books/' + ebook);
    file.pipe(response);
}

exports.download_book = function(request, response) {
    var query = url.parse(request.url).query;
    var ebook = querystring.parse(query)['ebook'];

    var rstream = fs.createReadStream('./books/' + ebook);
    var wstream = fs.createWriteStream('./downloads/' + ebook + '.gz');
    var gzip = zlib.createGzip();

    rstream.pipe(gzip).pipe(wstream).on('finish', function() {
        console.log('Finished compressing the file');

        fs.readFile('./details.html', function(err, html) {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(html);
            response.write(`<script type="text/javascript">alert('Downloaded the file, check in /downloads folder');</script>`);
            response.end();
        });
    });
}

exports.display_style = function(url, request, response) {
    fs.readFile('./style.css', function(err, css) {
        if(err) {
            throw err;
        }

        response.writeHead(200, {"Content-Type": "text/css"});
        response.write(css);
        response.end();
    });
}
