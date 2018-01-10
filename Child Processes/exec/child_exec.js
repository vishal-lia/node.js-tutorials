var exec = require('child_process').exec;

var child = exec('node -v', function(err, stdout, stderr) {
    if(err) {
        console.log("Error: " + stderr);
    }
    else {
        console.log("Output: " + stdout);
    }
});

console.log("Child PID: " + child.pid);