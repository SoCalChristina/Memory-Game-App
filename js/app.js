/*
 * Display the cards on the page
 * /  - shuffle the list of cards using the provided "shuffle" method below
 */

let card = document.getElementsByClassName('card');
let cards = [...card];
let deck = document.querySelector('.deck');
let moves = document.querySelector('.moves');
let openedCards = [];
let changeMovesNumber = document.getElementById('moves');
let matchCount =0;


const button = document.querySelector('.play-again');
let starNumber=0;

/*time variables */

let time = '00:00';
let seconds = 0;
let minutes = 0;
let timeTiger = 0;
let t;
const timer = document.getElementById('timer');

/* modal variables */

const modal = document.querySelector('.modal');
const modalText = document.querySelector('.modalText');

window.onload = function() {
newGame();
};

/* restart game with event listener */

let restart = document.getElementById('restart');
restart.addEventListener('click', newGame);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

    return array;
}

 /*
  *   - loop through each card and create its HTML
  *   - add each card's HTML to the page
  */
function playingCards(){
  let shuffleCards = shuffle(cards);
/*  - loop through each card and create its HTML
 *   - add each card's HTML to the page */
 /*  - display the card's symbol (put this functionality in another function that you call from this one)*/
  for (let i = 0; i < shuffleCards.length; i++) {
  shuffleCards[i].classList.remove('show', 'open', 'match', 'mismatched'); //animate
  deck.appendChild(shuffleCards[i]);
}
  for (let shuffleCard of shuffleCards) {
    /*/*
     * set up the event listener for a card. If a card is clicked: */
  shuffleCard.addEventListener('click', clickedCards);
  }
}

  function newGame() {
     resetMovesCount();
     resetStarRating();
     matchCount = 0;
     timeTiger = 0;
     resetTimer();
     openedCards = [];
     playingCards();
}

/* once the card is being clicked time and comparision starts */
/*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one) */
/*  - if the list already has another card, check to see if the two cards match */
function clickedCards (){
   displayCard();
   addToOpenCards();
   timeTiger++;
    if(timeTiger === 1){
      startTimer();
    }
  if (openedCards.length === 2){
    addMoves();
  if (openedCards[0].innerHTML === openedCards[1].innerHTML){
    matchCount++;
    console.log(matchCount);
    stopTimer();
    match();
  } else {
    noMatch();
   }
}


/* card dispalyed */

function displayCard (){
  console.log(event.target.tagName);
  const cardTagName = event.target;
  if (cardTagName.tagName === 'LI'){
     if (openedCards.length < 2){
  event.target.classList.add('open', 'show');
    console.log(event.target);
     }
  }
}

/* add new card to the opened cards */
function addToOpenCards() {
  openedCards.push(event.target);
}

/* checking if 2 cards match */
/* if the cards do match, lock the cards in the open position
(put this functionality in another function that you call from this one)*/

function match() {
  openedCards[0].classList.add('match');//animate
  event.target.classList.add('match');//'animate'
  openedCards[0].classList.remove('show', 'open');
  event.target.classList.remove('show', 'open');
  openedCards = [];
}


/*    + if the cards do not match, remove the cards from the
list and hide the card's symbol (put this functionality in
another function that you call from this one)*/

function noMatch (){
  openedCards[0].classList.add("mismatched");
  openedCards[1].classList.add("mismatched");
  setTimeout(function(){
      openedCards[0].classList.remove("show", "open", "mismatched");
      openedCards[1].classList.remove("show", "open", "mismatched");
      openedCards = [];
  },1000);
}
}

/* increment the move counter and display it on the page */
/*  + increment the move counter and display it on the page
(put this functionality in another function that you call from this one) */

function addMoves(){
  moves++;
  console.log(moves);
  changeMovesNumber.textContent = moves;
  starRating();
}

function resetMovesCount(){
  moves = 0;
  changeMovesNumber.textContent = moves;
}

/*stars setup */

function starRating (){
  if (moves > 8 && moves < 20){
    starNumber = 3;
  }
  if (moves > 19 && moves < 27) {
    document.getElementById('first').innerHTML ='<i class="fa fa-star-o"></i>';
    starNumber = 2;
  }
  if (moves > 26) {
    document.getElementById('first').innerHTML ='<i class="fa fa-star-o"></i>';
    document.getElementById('second').innerHTML ='<i class="fa fa-star-o"></i>';
    starNumber = 1;
  }
}
/* reset stars */

function resetStarRating (){
  document.getElementById('first').innerHTML ='<i class="fa fa-star"></i>';
  document.getElementById('second').innerHTML ='<i class="fa fa-star"></i>';
}

/* timer setup */

function startTimer() {
  clearInterval(t);
  t = setInterval(buildTimer,1000);
  }

timer.textContent = time;
function buildTimer () {
  seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    if (minutes === 60) {
      minutes++;
      seconds = 0;
  }
}
timer.textContent = (minutes < 10 ? "0" + minutes.toString(): minutes) + ":" + (seconds < 10 ? "0" + seconds.toString(): seconds);
}

/*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
/*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/

function stopTimer () {
   if (matchCount === 8){
     clearInterval(t);
   gameOver();
  }
}

/* reset the timer */

function resetTimer () {
  clearInterval(t);
  seconds = 0;
  minutes = 0;
  timer.textContent = time;
 }

/* Game Over - the modal message shows up */
/* source:  https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal2 */
 function gameOver () {
  modal.style.display = 'block';
  modalText.textContent = "Player Time: " + minutes + " : " + seconds + " \nPlayer Moves " + moves + " Player Star Rating " + " starNumber";
  newGame();
  }


/* button to restart the game */
 button.onclick = function() {
	modal.style.display = 'none';
	newGame();
};



 window.onclick = function(event) {
   if (event.target === modal) {
     modal.style.display = 'none';
     resetTimer();
     newGame();
   }
 };

 //newGame();
