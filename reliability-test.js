process.env['BROWSERSLIST_IGNORE_OLD_DATA'] = true; // deal with spaghetti code and stuff

const { exec } = require("child_process");
const fs = require('fs');
var dayjs = require('dayjs')

let passes = 0
let fails = 0
let lastLine

let date = dayjs().format('YYYYMMDDHHHmmss')
const filePath = 'reports/' + date + '.txt'


function testRuns() {
    for (let i = 0; i < 2; i++) {
        exec("npx cypress run", (error, stdout, stderr) => {
            let splitLines = stdout.split(/\r?\n/);
            lastLine = splitLines[splitLines.length - 3] // it's not actually the last line but it's what we need

            totalsSum()

            fs.appendFile(
                filePath, 
                'run ' + i  + ' :' + lastLine + '\n', 
                { flag: 'a' }, 
                function (err) {
                    if (err) throw err;
                });

            console.log(lastLine);
        })
    }
    display()
}

function totalsSum() {
    if ( lastLine.includes('failed') ) {
        fails = fails + 1
    }
    else if ( lastLine.includes('passed') ) {
        passes = passes + 1
    }
}

function display() {
    console.log(passes)
    console.log(fails)
}

testRuns()


// video moving code goes here
