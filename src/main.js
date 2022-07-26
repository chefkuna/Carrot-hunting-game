'use strict';
import PopUp from './popup.js';
import * as sound from './sound.js';
import GameBuilder, { Reason } from './game.js';

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
  .withGameDuration(3)
  .withCarrotCount(3)
  .withBugCount(5)
  .build();

game.setGameStopListener((reason) => {
  let message;
  switch(reason) {
    case Reason.cancel:
      message = 'REPLAY❓';
      sound.playAlert();
      break;
    case Reason.win:
      message = 'YOU WON!!😊';
      sound.playWin();
      break;
    case Reason.lose:
      message = 'YOU LOST...🐔'
      sound.playBug();
      break;
    default:
      throw new Error('not  valid reason');
  }
  gameFinishBanner.showWithText(message);
})

gameFinishBanner.setClickListener(()=> {
  game.start();
})




