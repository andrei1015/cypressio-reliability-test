const { exec } = require("child_process");
const fs = require('fs');
var dayjs = require('dayjs')
process.env['BROWSERSLIST_IGNORE_OLD_DATA'] = true;

let passes = 0
let fails = 0
let lastLine

let date = dayjs().format('YYYYMMDDHHHmm')
const filePath = 'reports/' + date + '.txt'

const fd = fs.openSync(filePath, 'w')


function testRuns() {
    for (let i = 0; i < 2; i++) {
        exec("npx cypress run", (error, stdout, stderr) => {
            let splitLines = stdout.split(/\r?\n/);
            lastLine = splitLines[splitLines.length - 3] // it's not actually the last line but it's what we need

            totalsSum()
            display()
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


// video mutat
