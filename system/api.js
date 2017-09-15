const fs = require('fs');


exports.getFilesDirectory = function (dirName, callback) {
    fs.readdir(dirName, (err, files) => {
        if (err) return callback(err);

        callback(null, files);
    });
}

exports.copyFilesToAnotherDirectory = (dirOrigin, dirDestiny, mode, callback) => {
    fs.readdir(dirOrigin, (err, files) => {
        if (err) return callback(err);

        let feedBackCopyList = []
        files.forEach((file, index) => {
            fs.readFile(dirOrigin + '/' + file, 'utf8', (err, content) => {
                if (err) return callback(err);
                
                fs.appendFile( dirDestiny + '/' + (mode == '-s' ? file : 'all.txt'), content.toString(), 'utf8', (err) => {
                    if (err) feedBackCopyList.push({ name: file, error: err });

                    feedBackCopyList.push({ name: file, msg: 'Your File was copied with success' });

                    if (index == (files.length - 1))
                        callback(null, feedBackCopyList);
                })
            })
        });

    })
}

/*fs.readdir('c:/cdr-files/start', (err, files) => {
    if (err) {
        console.log("err", err);
        return;
    }

    files.forEach((file) => {
        fs.readFile('c:/cdr-files/start/' + file, 'utf8', (err, content) => {
            if (err) throw err;
            console.log(content.toString());
            fs.appendFile('c:/cdr-files/end/newFile.txt', content.toString(), 'utf8', (err) => {
                if (err) throw err;
                console.log('The "data to append" was appended to file!');
            })
        })
    })
})*/


/*fs.mkdir("c:/teste-one", (resp1, resp2) => {
    console.log("resp1", resp1);
    console.log("resp2", resp2);
})*/

exports.hello = function () {
    console.log('casa');
}