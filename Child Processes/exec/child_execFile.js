var execFile = require('child_process').execFile;
var child = execFile('node', ['child_exec.js'], function(err, stdout, stderr) {
    if(err) {
        console.log("Error: " + stderr);
    }
    else {
        console.log("Output: " + stdout);
    }
});

console.log("Child PID: " + child.pid);