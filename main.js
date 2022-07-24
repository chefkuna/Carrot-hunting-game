'use strict';
const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const gameField = document.querySelector('.game__field');
const fieldRect = gameField.getBoundingClientRect();
const playBtn = document.querySelector('.play__button');
const gameTimer = document.querySelector('.game__timer');
const carrotScore = document.querySelector('.carrot__score');
const popUp = document.querySelector('.popup');
const popUpText = document.querySelector('.popup__result');
const popUpReplay = document.querySelector('.popup__replay');


let started = false;
let score = 0;
let timer = undefined;

playBtn.addEventListener('click', ()=>{
  if(started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
})

function stopGame() {
  stopGameTimer();
  hideGameButton();
  showPopUpWithText('REPLAY❓');
}

function startGame() {
  initGame();
  showStopButton();
  showTimerAndCount();
  startGameTimer();
}

function showStopButton() {
  const icon = playBtn.querySelector('.fa-play');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

function hideGameButton() {
  playBtn.style.visibility = 'hidden';
}

function startGameTimer () {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if(remainingTimeSec <= 0) {
      clearInterval(timer);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function showTimerAndCount() {
  gameTimer.style.visibility = 'visible';
  carrotScore.style.visibility = 'visible';
}

function showPopUpWithText(text) {
  popUp.classList.remove('popup--hide');
  popUpText.innerText = text;
}

function initGame() {
  gameField.replaceChildren();    // field.innerHTML = '';
  carrotScore.innerText = CARROT_COUNT;
  addItem('carrot', CARROT_COUNT, 'img/carrot.png');
  addItem('bug', BUG_COUNT, 'img/bug.png');
}

function addItem (className, count, imgPath) {
  for(let i=0; i<count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = Math.floor(Math.random()*(fieldRect.width-CARROT_SIZE));
    const y = Math.floor(Math.random()*(fieldRect.height-CARROT_SIZE));

    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    gameField.appendChild(item);
  }
}

function Timer () {
  setInterval(() => {
    
  }, 1000);
}

function myTimer() {

}


