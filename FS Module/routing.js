var routeHandler = require('./routeHandler');

exports.enableRoute = function(url, request, response) {
    var pathname = url.pathname;
    console.log("Pathname: " + pathname);

    switch(pathname) {
        case '/home': 
                    routeHandler.display_home(url, request, response);
                    break;
        case '/login':
                    routeHandler.display_login(url, request,response);
                    break;
        case '/signup':
                    routeHandler.display_signup(url, request, response);
                    break;
        case '/register':
                    routeHandler.display_register(url, request, response);
                    break;
        case '/books':                                       
                    routeHandler.view_books(request, response);
                    break;
        case '/book1.jpg':  
                    routeHandler.getImageResponse(request,response);
                    break;
        case '/book2.jpg':  
                    routeHandler.getImageResponse(request,response);
                    break;
        case '/book3.jpg':  
                    routeHandler.getImageResponse(request,response);
                    break;
        case '/books/view':
                    routeHandler.view_book(request, response);
                    break;
        case '/books/download':
                    routeHandler.download_book(request, response);
                    break;                
        case '/style.css':
                    routeHandler.display_style(url, request, response);
                    break;
        case '/books/style.css':
                    routeHandler.display_style(url, request, response);
                    break;                                          
        default:
                    routeHandler.display_home(url, request, response);
                    break;
    }
}