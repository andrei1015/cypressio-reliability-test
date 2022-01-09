const { exec } = require("child_process");
process.env['BROWSERSLIST_IGNORE_OLD_DATA'] = true;

let runNumber = 0
var passes = 0
var fails = 0

function testRuns() {
    for (let i = 0; i < 2; i++) {
        exec("npx cypress run", (error, stdout, stderr) => {
            let splitLines = stdout.split(/\r?\n/);
            let lastLine = splitLines[splitLines.length - 3] // it's not actually the last line but it's what we need

            console.log(lastLine);

            if ( lastLine.includes('failed') ) {
                fails = fails + 1
            }

            else if ( lastLine.includes('passed') ) {
                passes = passes + 1
            }
        })
    }
    return fails, passes
}

testRuns()

function totals(fails, passes) {
    console.log("fails: " + fails)
    console.log("passes: " + passes)  
}

totals()





// video mutat
