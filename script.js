let number = 0
let romanNumber = null
let playerIndex = 0
let time = 0
let intervalId = null
let score = 0

window.onload = () => {
    console.log("Loading...")

    alert("Let's go ?")
    resetGame()

    window.addEventListener('keydown', handleKeyPressed)
}

/* GAME */
function resetGame() {
    if (intervalId !== null) {
        clearInterval(intervalId)
    }

    resetRound()
    time = 2000

    const scoreTag = document.getElementById('score')
    scoreTag.innerText = 0
    intervalId = setInterval(handleTime, 100)
}

function resetRound() {
    playerIndex = 0
    number = Math.round(Math.random() * 1000)
    console.log(number)
    romanNumber = numberToRomanNumber(number)
    console.log(romanNumber)

    const numberTag = document.getElementById('number')
    numberTag.innerHTML = ''
    romanNumber.split('').forEach((number, index) => {
        numberTag.innerHTML += `<div id="number-${index}">${number}</div>`
    })
}

/* ROMAN NUMBERS */
function numberToRomanNumber(number) {
    const stringedNumber = number.toString()
    const numberArray = stringedNumber.split('')

    const romainDigits = [null, 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
    const decomposedDigits = [
        [],
        [1],
        [1, 1],
        [1, 1, 1],
        [1, 5],
        [5],
        [5, 1],
        [5, 1, 1],
        [5, 1, 1, 1],
        [1, 10],
        [10]
    ]

    let response = ''

    for (let i = 0; i < numberArray.length; i++) {
        const decomposedDigit = decomposedDigits[parseInt(numberArray[i])]
        if (decomposedDigit.length > 0) {
            const realIndex = numberArray.length - 1 - i
            for (const digit of decomposedDigit) {
                if (realIndex > 0) {
                    response += romainDigitsByIndex(digit * Math.pow(10, realIndex))
                } else {
                    response += romainDigits[digit]
                }
            }
        }
    }

    return response
}

function romainDigitsByIndex(number) {
    switch (number) {
        case 1:
            return 'I'
        case 5:
            return 'V'
        case 10:
            return 'X'
        case 50:
            return 'L'
        case 100:
            return 'C'
        case 500:
            return 'D'
        case 1000:
            return 'M'
    }
}

/* PLAYER */
function handleKeyPressed(event) {
    switch (event.key) {
        case '7':
        case 'a':
            console.log('I')
            tryLetterToIndex('I', playerIndex)
            break
        case '8':
        case 'z':
            console.log('V')
            tryLetterToIndex('V', playerIndex)
            break
        case '9':
        case 'e':
            console.log('X')
            tryLetterToIndex('X', playerIndex)
            break
        case '4':
        case 'r':
            console.log('L')
            tryLetterToIndex('L', playerIndex)
            break
        case '5':
        case 't':
            console.log('C')
            tryLetterToIndex('C', playerIndex)
            break
        case '6':
        case 'y':
            console.log('D')
            tryLetterToIndex('D', playerIndex)
            break
        case '1':
        case 'u':
            console.log('M')
            tryLetterToIndex('M', playerIndex)
            break
    }

    if (playerIndex >= romanNumber.length) {
        const scoreTag = document.getElementById('score')
        scoreTag.innerText = ++score
        resetRound()
    }
}

function tryLetterToIndex(letter, index) {
    if (romanNumber[index] === letter) {
        const letterTag = document.getElementById('number-' + playerIndex)
        letterTag.classList.add('text-green')
        playerIndex += 1
    }
    else {
        resetRound()
    }
}


/* TIME */
function milliToSec(time) {
    return (time / 100).toFixed(1)
}

function handleTime() {
    time -= 10
    const timerTag = document.getElementById('timer')
    timerTag.innerText = milliToSec(time)

    if (time <= 0) {
        alert("Time!\nYour score : " + score)
        resetGame()
    }
}
