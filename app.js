const Cards = [
    {
        name: 'HappySweat',
        img: 'images/Happy_Sweat.png'
    },
    {
        name: 'Holy',
        img: 'images/Holy.png'
    },
    {
        name: 'InLove',
        img: 'images/In_Love.png'
    },
    {
        name: 'SlightSmile',
        img: 'images/Slight_Smile.png'
    },
    {
        name: 'SmileEmoji',
        img: 'images/Smile_Emoji.png'
    },
    {
        name: 'SmileEmojiClosedEyes',
        img: 'images/Smile_Emoji_Closed_Eyes.png'
    },
    {
        name: 'UpsideDownSmile',
        img: 'images/Upside_Down_Smile.png'
    },
    {
        name: 'Wink',
        img: 'images/WInk.png'
    },
    {
        name: 'HappySweat',
        img: 'images/Happy_Sweat.png'
    },
    {
        name: 'Holy',
        img: 'images/Holy.png'
    },
    {
        name: 'InLove',
        img: 'images/In_Love.png'
    },
    {
        name: 'SlightSmile',
        img: 'images/Slight_Smile.png'
    },
    {
        name: 'SmileEmoji',
        img: 'images/Smile_Emoji.png'
    },
    {
        name: 'SmileEmojiClosedEyes',
        img: 'images/Smile_Emoji_Closed_Eyes.png'
    },
    {
        name: 'UpsideDownSmile',
        img: 'images/Upside_Down_Smile.png'
    },
    {
        name: 'Wink',
        img: 'images/WInk.png'
    }
]

Cards.sort(() => 0.5 - Math.random());

const cardDisplay = document.querySelector('#cards');
const result = document.getElementById('result');
const wonDisplay = document.getElementById('Won');
const wonCards = [];

let selectedCards = [];
let Won = 0;
let isBoardLocked = false;

function createCards(){
    for(var i = 0; i < Cards.length; i++){
        const card = document.createElement('img')
        card.setAttribute('src','images/Blank-Card.png');
        card.setAttribute('id','card')
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard)
        cardDisplay.appendChild(card);
    }
}
function checkMatch(){
    const cards = document.querySelectorAll('img');
    if(selectedCards[0].name == selectedCards[1].name){
        cards[selectedCards[0].id].setAttribute('src', 'images/Won.png');
        cards[selectedCards[1].id].setAttribute('src', 'images/Won.png');
        cards[selectedCards[0].id].removeEventListener('click',flipCard);
        cards[selectedCards[1].id].removeEventListener('click',flipCard);
        Won += 1;
        result.innerHTML = Won
        wonCards.push({'id': selectedCards[0].id});
        wonCards.push({'id': selectedCards[1].id});
    } else {
        cards[selectedCards[0].id].setAttribute('src', 'images/Blank-Card.png');
        cards[selectedCards[1].id].setAttribute('src', 'images/Blank-Card.png');
        cards[selectedCards[0].id].addEventListener('click',flipCard);
        cards[selectedCards[1].id].addEventListener('click',flipCard);

    }
    selectedCards = [];
    if(Won === 8){
        wonDisplay.innerHTML = 'You got all '+ Won + ' emoji matches!';
    }
    isBoardLocked = false;
}
function flipCard(){
    const cardId = this.getAttribute('data-id');
    const flippedCard = Cards[cardId];
    
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
createCards();
