process.on('message', function(m) {
    if(m.cmd === "double") {
        console.log(`Double - ${m.number}`);
        var double =  m.number*2;
        process.send({answer: double});
    }
    else if(m.cmd === "done") {
        process.exit();
    }
});