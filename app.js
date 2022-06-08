const cardsArray = [
    {
        name: 'HappySweat',
        img: 'res/images/Happy_Sweat.png'
    },
    {
        name: 'Holy',
        img: 'res/images/Holy.png'
    },
    {
        name: 'InLove',
        img: 'res/images/In_Love.png'
    },
    {
        name: 'SlightSmile',
        img: 'res/images/Slight_Smile.png'
    },
    {
        name: 'SmileEmoji',
        img: 'res/images/Smile_Emoji.png'
    },
    {
        name: 'SmileEmojiClosedEyes',
        img: 'res/images/Smile_Emoji_Closed_Eyes.png'
    },
    {
        name: 'UpsideDownSmile',
        img: 'res/images/Upside_Down_Smile.png'
    },
    {
        name: 'Wink',
        img: 'res/images/Wink.png'
    },
    {
        name: 'HappySweat',
        img: 'res/images/Happy_Sweat.png'
    },
    {
        name: 'Holy',
        img: 'res/images/Holy.png'
    },
    {
        name: 'InLove',
        img: 'res/images/In_Love.png'
    },
    {
        name: 'SlightSmile',
        img: 'res/images/Slight_Smile.png'
    },
    {
        name: 'SmileEmoji',
        img: 'res/images/Smile_Emoji.png'
    },
    {
        name: 'SmileEmojiClosedEyes',
        img: 'res/images/Smile_Emoji_Closed_Eyes.png'
    },
    {
        name: 'UpsideDownSmile',
        img: 'res/images/Upside_Down_Smile.png'
    },
    {
        name: 'Wink',
        img: 'res/images/Wink.png'
    }
]

cardsArray.sort(() => 0.5 - Math.random());

const cardDisplay = document.querySelector('#cards');
const result = document.getElementById('result');
const wonDisplay = document.getElementById('Won');
const buttonDisplay = document.getElementById('button');
const timerDisplay = document.getElementById('timer');
const wonCards = [];


let selectedCards = [];
let Won = 0;
let timePassed = 0;
let isBoardLocked = false;

timerDisplay.innerHTML = timePassed + ' secs';


function createCards(){
    for(var i = 0; i < cardsArray.length; i++){
        const card = document.createElement('img')
        card.setAttribute('src','res/images/Blank-Card.png');
        card.setAttribute('id','card')
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard)
        cardDisplay.appendChild(card);
    }
    startGame();
}
function startGame(){
    cardsArray.sort(() => 0.5 - Math.random());
    const button = document.createElement('button');
    isBoardLocked = true;
    button.setAttribute('id','play');
    button.innerText = 'Start';
    buttonDisplay.appendChild(button);
    button.addEventListener('click', () => {
        wonDisplay.innerHTML = '';
        Won = 0;
        result.innerHTML = 0;
        timePassed = 0;
        unflipCards();
        Timer();
        isBoardLocked = false;
        buttonDisplay.removeChild(button);
    });
}
function Timer(){
    if(Won != 8){
        timePassed += 1;
        timerDisplay.innerHTML = timePassed + ' secs';
        setTimeout("Timer()",1000)
    }
}
function checkMatch(){
    const cards = document.querySelectorAll('img');
    if(selectedCards[0].name == selectedCards[1].name){
        cards[selectedCards[0].id].setAttribute('src', 'res/images/Won.png');
        cards[selectedCards[1].id].setAttribute('src', 'res/images/Won.png');
        cards[selectedCards[0].id].removeEventListener('click',flipCard);
        cards[selectedCards[1].id].removeEventListener('click',flipCard);
        Won += 1;
        result.innerHTML = Won;
        wonCards.push({'id': selectedCards[0].id});
        wonCards.push({'id': selectedCards[1].id});
    } else {
        cards[selectedCards[0].id].setAttribute('src', 'res/images/Blank-Card.png');
        cards[selectedCards[1].id].setAttribute('src', 'res/images/Blank-Card.png');
        cards[selectedCards[0].id].addEventListener('click',flipCard);
        cards[selectedCards[1].id].addEventListener('click',flipCard);

    }
    selectedCards = [];
    if(Won === 8){
        wonDisplay.innerHTML = 'You got all '+ Won + ' emoji matches!';
        startGame();
    }
    isBoardLocked = false;
}
function flipCard(){
    const cardId = this.getAttribute('data-id');
    const flippedCard = cardsArray[cardId];
    
    if(isBoardLocked == true){
        return;
    } else {
        selectedCards.push({'name': flippedCard.name, 'id': cardId});
        this.setAttribute('src', flippedCard.img);
        this.removeEventListener('click', flipCard);
        if(selectedCards.length === 2){
            isBoardLocked = true;
            setTimeout(checkMatch, 500);
        }
    }  
}
function unflipCards(){
    const cards = document.querySelectorAll('img');
    for(let i = 0; i < cards.length; i++){
        cards[i].setAttribute('src','res/images/Blank-Card.png');
        cards[i].addEventListener('click',flipCard);
    }
}
createCards();