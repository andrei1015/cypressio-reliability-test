const { exec } = require("child_process");
process.env['BROWSERSLIST_IGNORE_OLD_DATA'] = true;

let runNumber = 0
// let passes
// let fails
// let passes = 0
// let fails = 0

function testRuns() {
// let passes
// let fails
var passes = 0
var fails = 0
    for (let i = 0; i < 2; i++) {
        exec("npx cypress run", (error, stdout, stderr) => {
            let splitLines = stdout.split(/\r?\n/);
            let lastLine = splitLines[splitLines.length - 3] // it's not actually the last line but it's what we need

            console.log(lastLine);

            if ( lastLine.includes('failed') ) {
                fails = fails + 1
                // console.log("fails: " + fails)
                // console.log("passes: " + passes) 
            }

            // else if ( lastLine.includes('passed') ) {
            //     passes = passes + 1
            //     // console.log("fails: " + fails)
            //     // console.log("passes: " + passes) 
            // }
            //  console.log("fails: " + fails)
            //  console.log("passes: " + passes)  
        })
    }
    // console.log( fails, passes )
    //totals()
    return fails
    // callback()

}

testRuns(() => {
    console.log(fails)
    //console.log(passes)
})

console.log(testRuns())

// testRuns(fails, passes, function() {
//     // await testRuns(() => {
//         console.log('cacat' + passes)
//         console.log(fails)
//     // }) 
//     // const cacat = await testRuns()
//     // console.log(cacat)
// })

// const pipi =  testRuns()
// console.log(pipi)

// totals()


// video mutat
