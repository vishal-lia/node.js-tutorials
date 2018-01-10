var spawn = require('child_process').spawn;
var child = spawn('node', ['child.js']);

child.stdin.write("From Parent - Hello");

child.stdout.on('data', function(data) {
    console.log("Received a reply: " + data);
});

child.stderr.on('data', function(err) {
    console.log("Error:" + err);
});

child.on('exit', function(exitCode) {
    console.log("Child exited: " + exitCode);
});
console.log("Child PID: " + child.pid);