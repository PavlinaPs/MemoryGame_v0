// sounds
const matchSound = new Audio('./sounds/mixkit-achievement-bell-600.wav');
    matchSound.volume = 0.05;
const errorSound = new Audio('./sounds/mixkit-game-show-buzz-in-3090.wav');
    errorSound.volume = 0.1;
const gameWon = new Audio('./sounds/mixkit-winning-chimes-2015.wav');
    gameWon.volume = 0.4;

// sound toggle
const soundButon = document.getElementById('soundOff');
soundButon.addEventListener('click', () => {
    let checkSound = soundButon.getAttribute('sound-off');
    if(checkSound === 'false') {
        soundButon.setAttribute('sound-off', true);
        matchSound.volume = 0;
        errorSound.volume = 0;
        gameWon.volume = 0;
    } else {
        soundButon.setAttribute('sound-off', false);
        matchSound.volume = 0.05;
        errorSound.volume = 0.1;
        gameWon.volume = 0.4;
    }
});

function playMemoryGame() {    
    // array of card objects
    const cardArray = [
    {
        name: 'hamburger',
        img: './images/hamburger.jpg',
    },
    {
        name: 'pumpkin-bread',
        img: './images/sweet-potato.jpg',
    },
    {
        name: 'pumpkin-soup',
        img: './images/pumpkin-soup.jpg',
    },
    {
        name: 'salmon-salad',
        img: './images/salmon-salad.jpg',
    },
    {
        name: 'sauerkraut',
        img: './images/sauerkraut.jpg',
    },
    {
        name: 'thanksgiving',
        img: './images/thanksgiving.jpg',
    },
    {
        name: 'hamburger',
        img: './images/hamburger.jpg',
    },
    {
        name: 'pumpkin-bread',
        img: './images/sweet-potato.jpg',
    },
    {
        name: 'pumpkin-soup',
        img: './images/pumpkin-soup.jpg',
    },
    {
        name: 'salmon-salad',
        img: './images/salmon-salad.jpg',
    },
    {
        name: 'sauerkraut',
        img: './images/sauerkraut.jpg',
    },
    {
        name: 'thanksgiving',
        img: './images/thanksgiving.jpg',
    }
    ];

    // shuffle array items randomly
    cardArray.sort(() => 0.5 - Math.random());

    // creating grid
    const gridDisplay = document.querySelector('#grid');
    const resultDisplay = document.querySelector('#result');
    let cardsChosen = [];
    let cardsChosenId = [];
    const cardsWon = [];
    let lockboard = false;

    function createBoard () {
        cardArray.forEach(item => {
            const card = document.createElement('img');
            card.setAttribute("src", "./images/cover.png");
            card.setAttribute('data-id', cardArray.indexOf(item));
            card.addEventListener('click', flipCard);
            gridDisplay.appendChild(card);   // can also be only append()
        })
    }
    createBoard();
    
    function checkMatch() {
        const cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        // clicked the same image
        if(optionOneId == optionTwoId) {
            errorSound.play();
            cards[optionOneId].setAttribute('src', './images/cover.png');
            cards[optionTwoId].setAttribute('src', './images/cover.png');
        }
        // match 
        else if(cardsChosen[0] === cardsChosen[1]) {
            matchSound.play()
            cards[optionOneId].setAttribute('src', './images/white.png');
            cards[optionTwoId].setAttribute('src', './images/white.png');
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        // not a match
        } else {
            cards[optionOneId].setAttribute('src', './images/cover.png');
            cards[optionTwoId].setAttribute('src', './images/cover.png');
        }
        lockboard = false;

        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length;     

        if(cardsWon.length == cardArray.length/2) {
            gameWon.play();
            resultDisplay.innerHTML = ' Congratulations! You found them all!'
        }
    }

    function flipCard() {
        // don't flip another card before previous pair is finished
        if(lockboard) return;
        const cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);
        if (cardsChosen.length === 2) {
            lockboard = true;
            setTimeout(checkMatch, 800);
            
        }
    }
}
playMemoryGame();

const newGameButton = document.getElementById('newGame');
newGameButton.addEventListener('click', playNewGame);

function playNewGame() {
    const cardsToRemove = document.querySelectorAll('img');
    const gridToClear = document.getElementById('grid')
    cardsToRemove.forEach(card => {
        gridToClear.removeChild(card);
    });
    playMemoryGame();
};

