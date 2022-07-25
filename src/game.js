'use strict';
import Field from './field.js';
import * as sound from './sound.js';

export default class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameTimer = document.querySelector('.game__timer');
    this.carrotScore = document.querySelector('.carrot__score');
    this.playBtn = document.querySelector('.play__button');
    this.playBtn.addEventListener('click', ()=>{
      if(this.started) {
        this.stop();
      } else {
        this.start();
      }
    })

    this.carrotGameField = new Field(carrotCount, bugCount);
    this.carrotGameField.setClickListener(this.onItemClick);

    this.started = false;
    this.timer = undefined;
    this.score = 0;
  }

  onItemClick = (item) => {    // this 바인딩
    if(!this.started) {
      return;
    }
    if (item === 'carrot') {
      this.score++;
      this.updateScoreBoard();
      if(this.score === this.carrotCount) {
        this.finish(true);
      }
    } else if (item === 'bug') {
      this.finish(false);
    }
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }
  start() {
    this.started = true;
    this.initGame();
    this.showStopButton();
    this.showTimerAndCount();
    this.startGameTimer();
    sound.playBackground();
  }
  
  stop() {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    this.gameFinishBanner.showWithText('REPLAY❓');
    sound.playAlert();
    sound.stopBackground();
    this.onGameStop && this.onGameStop('cancel');
  }
  
  finish(win) {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    if(win) {
      sound.playWin();
    } else {
      sound.playBug();
    }
    sound.stopBackground();
    this.onGameStop && this.onGameStop(win? 'win' : 'lose');
  }

  showStopButton() {
    const icon = this.playBtn.querySelector('.fa-solid');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    this.playBtn.style.visibility = 'visible';
  }
  
  hideGameButton() {
    this.playBtn.style.visibility = 'hidden';
  }

  showTimerAndCount() {
    this.gameTimer.style.visibility = 'visible';
    this.carrotScore.style.visibility = 'visible';
  }

  startGameTimer () {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if(remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.finish(this.carrotCount === this.carrotScore);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }
  
  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }
  
  initGame() {
    this.score = 0;
    this.carrotScore.innerText = this.carrotCount;
    this.carrotGameField.init();
  }
  
  updateScoreBoard() {
    this.carrotScore.innerText = this.carrotCount - this.score;
  }
}