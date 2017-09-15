const apiFileSystem = require('./api');
const mode = process.argv[2];
const isWindows = /^win/.test(process.platform);

let dirStart = null;
let dirEnd = null;

if (isWindows) {
    dirStart = process.argv[3] ? process.argv[3] : 'c:/start';
    dirEnd = process.argv[4] ? process.argv[4] : 'c:/end';
}
else {
    dirStart = process.argv[3] ? process.argv[3] : '/home';
    dirEnd = process.argv[4] ? process.argv[4] : '/home';
};

console.log('dirS',dirStart);
console.log('dirS',dirEnd);

module.exports = function (app) {

    if (mode == '-s' || mode == '-sf')
        apiFileSystem.copyFilesToAnotherDirectory(dirStart, dirEnd, mode, (err, contentList) => {
            contentList.forEach(content => {
                console.log(content);
            })
        })
}