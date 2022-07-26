'use strict';
import PopUp from './popup.js';
import GameBuilder from './game.js';

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
  .withGameDuration(5)
  .withCarrotCount(7)
  .withBugCount(10)
  .build();

game.setGameStopListener((reason) => {
  console.log(reason);
  let message;
  switch(reason) {
    case 'cancel':
      message = 'REPLAY❓';
      break;
      case 'win':
        message = 'YOU WON!!😊';
        break;
        case 'lose':
          message = 'YOU LOST...🐔'
          break;
          default:
            throw new Error('not  valid reason');
  }
  gameFinishBanner.showWithText(message);
})

gameFinishBanner.setClickListener(()=> {
  game.start();
})




