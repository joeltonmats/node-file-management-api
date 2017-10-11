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

/*

node index.js -c c:/NEW-FILES/start ///172.24.21.198/shared/files


MAX RANGE TO GENERATE FILES

0 - 5000000                 done
5000000 - 10000000          done
10000000 - 15000000         done
15000000 - 20000000         done 
20000000 - 25000000         done
25000000 - 30000000         done
30000000 - 35000000         done
35000000 - 40000000         done
40000000 - 45000000         done 
45000000 - 50000000         done
50000000 - 55000000         done
55000000 - 60000000         done
60000000 - 65000000         done
65000000 - 70000000         done
70000000 - 75000000         done
75000000 - 80000000         done
80000000 - 85000000         done
85000000 - 90000000         done
90000000 - 95000000         done
95000000 - 100000000        done

*/


exports.creatNewFileWithIncrementalContent = (dirDestiny, nameFile, content, incrementaNumberMore, callback) => {

    let lastLine = content[content.length - 2];
    const lastLineList = lastLine.split(';');
    
    for (let j = 0; j < 1000000; j = j + incrementaNumberMore) {
        const arrayNewItems = [];
        for (let i = 1; i <= incrementaNumberMore; i++) {
            let item = lastLineList.slice();
            item[item.length - 3] = j + i;
            item[item.length - 2] = j + i;
            item = item.join(";");

            arrayNewItems.push(item);
        }

        content = arrayNewItems.toString().trim();
        content += '|';
        content = content.replace(/,/g, '|');

        fs.writeFile(dirDestiny + '/' + (j + incrementaNumberMore)  + '.TXT', content, 'utf8', (err) => {
            if (err) callback(err, null);

            callback(null, (j + incrementaNumberMore) + '.TXT ' + 'sucesso!!!');

        })

    }

}
