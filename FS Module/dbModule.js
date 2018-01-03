var fs = require('fs');

exports.authenticateUser = function(username, password) {
    var verify = false;

    var usersObj = JSON.parse(fs.readFileSync('./users.json', 'utf8'));

    var verify = usersObj.some(function(user) {
        return ((username === user.name) && (password === user.password));         
    });

    if(verify) {
        return "Valid User";
    }
    else {
        return "Invalid User";
    }    
}

exports.addUser = function(username, password, address, response) {
    var usersObj = JSON.parse(fs.readFileSync('./users.json', 'utf8'));

    usersObj.push({
        "name" : username,
        "password" : password,
        "address" : address
    });

    fs.writeFileSync('./users.json', JSON.stringify(usersObj), 'utf8');

    return "User added successfully";
}