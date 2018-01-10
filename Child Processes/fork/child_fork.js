var { fork }  = require('child_process');
var child = fork(`${__dirname}/utility.js`);

child.send({cmd: "double", number: 20});

child.on('message', function(m) {
    console.log(`The answer is ${m.answer}`);
    child.send({cmd: "done"});
});

