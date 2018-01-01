var EventEmitter = require('events').EventEmitter;
var util = require('util');
var globalCount;

var RegisterEventClass = function(initial_count) {
    this.count = initial_count;
}

util.inherits(RegisterEventClass, EventEmitter);

RegisterEventClass.prototype.increment = function() {
    var self = this;
    self.count++;
    self.emit('visitor');
}

var access = new RegisterEventClass(0);

access.on('visitor', function() {
    globalCount = this.count;
    console.log("Number of people visited: " + globalCount);
});

exports.visitorCountEvent = function() {
    access.increment();
    return globalCount;
}