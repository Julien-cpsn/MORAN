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

    if(window.mobileCheck()) {
        console.log("Mobile")
        prompt()
    }
}

window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

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
