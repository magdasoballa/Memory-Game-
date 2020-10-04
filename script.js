let cards = document.querySelectorAll(".tile");
cards = [...cards];
const spans = document.querySelectorAll('span')

let gameArray = [];
let gameResult= 0;
const openCards = [];
const gameLength = cards.length / 2;
const time=document.querySelector('.time')
const startTime = new Date().getTime();
let minutes = null;
let seconds = null;
let timeout = null;



function countdown() {
    seconds = 60;
    minutes = 1;
    if (timeout) {
        clearInterval(timeout)
    }
    timeout = setInterval(tick, 1000);
}

const tick = () => {
    if (seconds > 0) {
        seconds--;
    } else if (seconds === 0 && minutes > 0) {
        seconds = 60;
        minutes--;
    } else {
        time.innerHTML = "You suck, you lost";
        clearInterval(timeout);
        window.location.reload()
        return;
    }
    time.innerHTML = "Your time: " + minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
}

const handleStart = () => {
    cards.forEach(card=> card.children[0].classList.add('hidden'))
    cards.forEach(card=> card.classList.remove('white'))
    cards.forEach(card=> card.classList.remove('win'))



    for (let i = 0; i < gameLength; i++) {
        const random = (Math.random() * (5 *(i + 1))).toFixed();
        const random2 = (Math.random() + ((i + 2))).toFixed()

        const firstOption = {
            id: 2 * i,
            display: `${random} x ${random2}`,
            result: random * random2
        }
        const secondOption = {
            id: 2 * i + 1,
            display: random * random2,
            result: random * random2
        }
        gameArray.push(firstOption)
        gameArray.push(secondOption)

    }
    const shuffledGame = gameArray.sort(() => Math.random() - 0.5)

    spans.forEach((span, index) => {
        span.innerHTML = `${shuffledGame[index].display}`
        const newDiv = document.createElement('div')
        newDiv.innerHTML = shuffledGame[index].result
        newDiv.style.opacity = '0'
        span.appendChild(newDiv)

    }

    )

countdown(2)
    cards.forEach(card => {
        card.addEventListener('click', handleClickCard)
    })
}


function handleClickCard() {
    const activeCard = this;
    activeCard.classList.add('white')
    activeCard.children[0].classList.remove('hidden')
    if (openCards.length === 0) {
        openCards[0] = activeCard
    } else if (openCards.length === 1) {
        openCards[1] = activeCard


    } else if (openCards.length === 2) {
        openCards[0].classList.remove('white')
        openCards[1].classList.remove('white')
        openCards[0].children[0].classList.add('hidden')
        openCards[1].children[0].classList.add('hidden')
        openCards.length = 0;
        openCards[0] = activeCard
    }
    handleWin()

}



const handleWin = () => {
    if (openCards[0] !== openCards[1]) {
        if (openCards[0].children[0].children[0].innerHTML === openCards[1].children[0].children[0].innerHTML) {
            openCards[0].classList.add('win')
            openCards[1].classList.add('win')
            openCards[0].children[0].classList.add('hidden')
            openCards[1].children[0].classList.add('hidden')
            gameResult +=1;
        }
    }
    endGame()
}



const endGame = () => {
    if (gameResult === gameLength) {
        const endTime = new Date().getTime();
        const gameTime = (endTime - startTime) / 1000
        window.alert(`Udało się! Twój wynik to: ${gameTime} sekund`)
        cards.forEach(card => card.classList.remove('win'))
        openCards[0].classList.remove('win','white')
        openCards[1].classList.remove('win', 'white')
        time.innerHTML= "Your time: 0:00"

    }
}

