process.env['BROWSERSLIST_IGNORE_OLD_DATA'] = true; // deal with spaghetti code and stuff

const { exec } = require("child_process");
const fs = require('fs');
var dayjs = require('dayjs');
const { callbackify } = require("util");

let passes
let fails
let lastLine
passes = 0
fails = 0

let date = dayjs().format('YYYYMMDDHHHmmss')
const filePath = 'reports/' + date + '.txt'


async function testRuns(callback) {
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
    return [passes, fails]
}

function totalsSum() {
    if ( lastLine.includes('failed') ) {
        fails = fails + 1
    }
    else if ( lastLine.includes('passed') ) {
        passes = passes + 1
    }
}

function display(fails, passes) {
    console.log('1')
    console.log(passes)
    console.log(fails)
    console.log('2')
}

async function run() {
    testRuns();
    await display(fails, passes);
}

run()

// video moving code goes here
