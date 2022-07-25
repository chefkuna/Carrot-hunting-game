'use strict';
import PopUp from './popup.js';
import Field from './field.js';
import * as sound from './sound.js';

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const playBtn = document.querySelector('.play__button');
const gameTimer = document.querySelector('.game__timer');
const carrotScore = document.querySelector('.carrot__score');

let started = false;
let timer = undefined;
let score = 0;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(()=> {
  startGame();
})

const carrotGameField = new Field(CARROT_COUNT, BUG_COUNT);
carrotGameField.setClickListener(onItemClick);

function onItemClick(item) {
  if(!started) {
    return;
  }
  if ( item === 'carrot') {
    score++;
    updateScoreBoard();
    if(score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if ( item === 'bug') {
    finishGame(false);
  }
}

playBtn.addEventListener('click', ()=>{
  if(started) {
    stopGame();
  } else {
    startGame();
  }
})

function updateScoreBoard() {
  carrotScore.innerText = CARROT_COUNT - score;
}

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndCount();
  startGameTimer();
  sound.playBackground();
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  gameFinishBanner.showWithText('REPLAY❓');
  sound.playAlert();
  sound.stopBackground();
}

function finishGame(win) {
  started = false;
  stopGameTimer();
  hideGameButton();
  if(win) {
    sound.playWin();
  } else {
    sound.playBug();
  }
  sound.stopBackground();
  gameFinishBanner.showWithText(win ? 'YOU WON!😊' : 'YOU LOST...🐔');
}

function showStopButton() {
  const icon = playBtn.querySelector('.fa-solid');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
  playBtn.style.visibility = 'visible';
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

function initGame() {
  score = 0;
  carrotScore.innerText = CARROT_COUNT;
  carrotGameField.init();
}

