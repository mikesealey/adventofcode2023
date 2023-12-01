const fs = require("fs/promises")

// each line originally contained a specific calibration value that the Elves now need to recover. 
// On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.


// This function returns a two-digit number created from the first and last digits in the input string
// If there is only 1 digit in the input string, the output will be a palindrome (11, 22, 33, etc)
// If there are no digits in the input string it will return 0

function getFirstLastDigits(string) {
    characters = string.split("")
    numberCharacters = []

    for (let i = 0; i < characters.length; i++) {
        if (!isNaN(Number(characters[i]))) {
            numberCharacters.push(Number(characters[i]))
        }
    }

    // if there were no numbers in the input string, numberCharacters[0] is undefined
    return [numberCharacters[0] * 10 || 0, numberCharacters[numberCharacters.length-1] || 0]
}

// This function fetches the input text, splits it into an array of strings, and uses getFirstLastDigits on each string to find a total.
const readAndTally = (path) => {
    return fs.readFile(path, "utf8")
    .then(fileContents => {
        const arrayOfStrings = fileContents.split("\n")

        let tally = 0

        arrayOfStrings.forEach(string => {
            tally += getFirstLastDigits(string)[0] + getFirstLastDigits(string)[1]
        })

        console.log(`tally from ${path} =  ${tally}`)



        return tally
    })
    .catch(err => {
        console.log("Error")
    })
}

readAndTally("inputtext.txt")
readAndTally("testInputText.txt")
