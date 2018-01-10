console.log("From child - Hello");
process.stdin.on('data', data => {
    console.log("\nReceived data: " + data);
    process.exit(0);
});

