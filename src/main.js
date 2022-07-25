'use strict';
import PopUp from './popup.js';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const gameField = document.querySelector('.game__field');
const fieldRect = gameField.getBoundingClientRect();
const playBtn = document.querySelector('.play__button');
const gameTimer = document.querySelector('.game__timer');
const carrotScore = document.querySelector('.carrot__score');


const carrotsound = new Audio('./sound/carrot_pull.mp3');
const alertsound = new Audio('./sound/alert.wav');
const bgsound = new Audio('./sound/bg.mp3');
const bugsound = new Audio('./sound/bug_pull.mp3');
const winsound = new Audio('./sound/game_win.mp3');

let started = false;
let timer = undefined;
let score = 0;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener( ()=> {
  startGame();
})

playBtn.addEventListener('click', ()=>{
  if(started) {
    stopGame();
  } else {
    startGame();
  }
})

gameField.addEventListener('click', onFieldClick);

function onFieldClick(event) {
  if(!started) {
    return;
  }
  if (event.target.matches('.carrot')) {
    event.target.remove();
    score++;
    playSound(carrotsound);
    updateScoreBoard();
    if(score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (event.target.matches('.bug')) {
    finishGame(false);
  }
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
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
  playSound(bgsound);
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  gameFinishBanner.showWithText('REPLAY❓');
  playSound(alertsound);
  stopSound(bgsound);
}

function finishGame(win) {
  started = false;
  stopGameTimer();
  hideGameButton();
  if(win) {
    playSound(winsound);
  } else {
    playSound(bugsound);
  }
  stopSound(bgsound);
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
  gameField.replaceChildren();    // field.innerHTML = '';
  carrotScore.innerText = CARROT_COUNT;
  addItem('carrot', CARROT_COUNT, 'img/carrot.png');
  addItem('bug', BUG_COUNT, 'img/bug.png');
}

function addItem (className, count, imgPath) {
  for(let i=0; i<count; i++) {
    const item = document.createElement('img');
    const x1 =0;
    const y1 =0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE - 40;
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    // const x = Math.floor(Math.random()*(fieldRect.width-CARROT_SIZE));
    // const y = Math.floor(Math.random()*(fieldRect.height-CARROT_SIZE));
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    gameField.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max-min) + min;
}