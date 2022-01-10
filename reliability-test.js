process.env['BROWSERSLIST_IGNORE_OLD_DATA'] = true; // deal with spaghetti code and stuff

const { execSync } = require("child_process");
const fs = require('fs');
var dayjs = require('dayjs');

let passes = 0
let fails = 0 
let lastLine


let date = dayjs().format('YYYYMMDDHHHmmss')
const filePath = 'reports/' + date + '.txt'

async function testRuns() {
    for (let i = 0; i < 2; i++) {
            let stdout = execSync('npx cypress run').toString()
            let splitLines = stdout.split(/\r?\n/);
            lastLine = splitLines[splitLines.length - 3] // it's not actually the last line but it's what we need

            if ( lastLine.includes('failed') ) {
                fails = fails + 1
            }
            else if ( lastLine.includes('passed') ) {
                passes = passes + 1
            }
    
            fs.appendFile(
                filePath, 
                'run ' + i  + ' :' + lastLine + '\n', 
                { flag: 'a' }, 
                function (err) {
                    if (err) throw err;
                });
            console.log(lastLine);
    }
    console.log('1')
    console.log(passes)
    console.log(fails)
    console.log('2')
}

testRuns()

// video moving code goes here
