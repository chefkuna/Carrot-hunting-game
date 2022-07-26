'use strict';
import { Field,  itemType } from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
  win : 'win',
  lose: 'lose',
  cancel: 'cancel',
});

//Builder Pattern
export default class GameBuilder {
  withGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  withCarrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  withBugCount(num) {
    this.bugCount = num;
    return this;
  }

  build() {
    return new Game(
      this.gameDuration,
      this.carrotCount,
      this.bugCount
    );
  }
}

class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameTimer = document.querySelector('.game__timer');
    this.carrotScore = document.querySelector('.carrot__score');
    this.playBtn = document.querySelector('.play__button');
    this.playBtn.addEventListener('click', ()=>{
      if(this.started) {
        this.stop(Reason.cancel);
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
    if (item === itemType.carrot) {
      this.score++;
      this.updateScoreBoard();
      if(this.score === this.carrotCount) {
        this.stop(Reason.win);
      }
    } else if (item === itemType.bug) {
      this.stop(Reason.lose);
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
  
  stop(reason) {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    sound.stopBackground(); 
    this.onGameStop && this.onGameStop(reason);
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
        this.stop(this.carrotCount === this.carrotScor? Reason.win : Reason.lose);
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