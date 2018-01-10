/* child_process.exec returns the whole buffer output from the child process.
 By default the buffer size is set at 200k. Use it to run programs that return result statuses, instead of data.
 Why exec and not spawn? Because we just want wget to tell us if the work was done properly or not, 
 we are not interested in buffers and streams. We are making wget do all the dirty work of making request, 
 handling data, and saving the file for us.
*/

// Function to download file using wget
var download_file_wget = function(file_url) {

    // extract the file name
    var file_name = url.parse(file_url).pathname.split('/').pop();
    // compose the wget command
    var wget = 'wget -P ' + DOWNLOAD_DIR + ' ' + file_url;
    // excute wget using child_process' exec function

    var child = exec(wget, function(err, stdout, stderr) {
        if (err) throw err;
        else console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
    });
};
