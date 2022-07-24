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
let timer = undefined;
let score = 0;

playBtn.addEventListener('click', ()=>{
  if(started) {
    stopGame();
  } else {
    startGame();
  }
  // started = !started;
})

popUpReplay.addEventListener('click', ()=> {
  popUp.classList.add('popup--hide');
  startGame();
})

gameField.addEventListener('click', onFieldClick);

function onFieldClick(event) {
  if(!started) {
    return;
  }
  if (event.target.matches('.carrot')) {
    event.target.remove();
    score++;
    updateScoreBoard();
    if(score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (event.target.matches('.bug')) {
    finishGame(false);
  }
}

function updateScoreBoard() {
  carrotScore.innerText = CARROT_COUNT - score;
}

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndCount();
  startGameTimer();
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  showPopUpWithText('REPLAY❓');
}

function finishGame(win) {
  started = false;
  stopGameTimer();
  hideGameButton();
  showPopUpWithText(win ? 'YOU WON!😊' : 'YOU LOST...🐔');
}

function showStopButton() {
  const icon = playBtn.querySelector('.fa-solid');
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
      finishGame(CARROT_COUNT === carrotScore);
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
  score = 0;
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