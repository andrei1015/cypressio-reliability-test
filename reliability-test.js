const { exec } = require("child_process");
const fs = require('fs');
process.env['BROWSERSLIST_IGNORE_OLD_DATA'] = true;

let date = new Date();
const filePath = '/reports/test.txt'

const fd = fs.openSync(filePath, 'w')


function testRuns() {
    for (let i = 0; i < 2; i++) {
        exec("npx cypress run", (error, stdout, stderr) => {
            let splitLines = stdout.split(/\r?\n/);
            let lastLine = splitLines[splitLines.length - 3] // it's not actually the last line but it's what we need

            fs.appendFile(filePath, 'This is run ' + i  + ' :' + lastLine, { flag: 'w' }, function (err) {
            if (err) throw err;
            console.log('Saved!');
            });

            console.log(lastLine);
        })
    }
}

testRuns()


// video mutat
