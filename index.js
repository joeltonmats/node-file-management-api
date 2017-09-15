// set up ======================================================================
const express = require("express");
const app = express();


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

// routes ======================================================================
/* serves main page */
app.get("/", function (req, res) {
    res.sendfile('main.html')
});

require('./system/fileMenagement.js')(app);

// listen (start app with node server.js) ======================================
const port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Listening on " + port);
});