# Child Processes
Run node file_name.js to test.

### Differences between spawn and exec of Node's child_process.
Use spawn when you want the child process to return huge binary data to Node, use exec when you want the child process to return simple status messages.

### Fork.
The child_process.fork() method is a special case of child_process.spawn() used specifically to spawn new Node.js processes. Like child_process.spawn(), a ChildProcess object is returned. The returned ChildProcess will have an additional communication channel built-in that allows messages to be passed back and forth between the parent and child.

### Cluster.
The cluster module uses to maximize the CPU usage was via forking processes so as to create programs that uses all the CPUs. 
