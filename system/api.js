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

                fs.appendFile(dirDestiny + '/' + (mode == '-s' ? file : 'all.txt'), content.toString(), 'utf8', (err) => {
                    if (err) feedBackCopyList.push({ name: file, error: err });

                    feedBackCopyList.push({ name: file, msg: 'Your File was copied with success' });

                    if (index == (files.length - 1))
                        callback(null, feedBackCopyList);
                })
            })
        });

    })
}

exports.getContentFile = (dirOrigin, callback) => {
    fs.readdir(dirOrigin, (err, files) => {
        if (err) return callback(err);

        let contentList = [];
        files.forEach((file, index) => {
            fs.readFile(dirOrigin + '/' + file, 'utf8', (err, content) => {
                contentList = content.split('|');
                callback(null, file, contentList)
            })
        });

    })
};

exports.creatNewFileWithIncrementalContent = (dirDestiny, nameFile, content, incrementaNumberMore, callback) => {

    let lastLine = content[content.length - 2];
    const lastLineList = lastLine.split(';');
    //let fieldSequential1 = Number(lastLineList[lastLineList.length - 3]);
    //fieldSequential1 = 5000000;

    for (let j = 99000000; j <= 99000000; j = j + 1000000) {
        const arrayNewItems = [];
        for (let i = 1; i <= incrementaNumberMore; i++) {
            let item = lastLineList.slice();
            item[item.length - 3] = j + i;
            item[item.length - 2] = j + i;
            item = item.join(";");

            arrayNewItems.push(item);
        }

        /* content = content.toString();
        content = content.concat(arrayNewItems.toString());
        content += '|';
        content = content.replace(/,/g, '|');
        fs.appendFile(dirDestiny + '/' + 'ONE-MILION.txt', content, 'utf8', (err) => {  */

        content = arrayNewItems.toString().trim();
        content += '|';
        content = content.replace(/,/g, '|');

        fs.appendFile(dirDestiny + '/' + j + '-' + nameFile, content, 'utf8', (err) => {
            if (err) callback(err, null);

            callback(null, 'sucesso!!!');

        })

    }

}