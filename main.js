'use strict'
const CARROT_SIZE = 80;

const gameField = document.querySelector('.game__field');
const fieldRect = gameField.getBoundingClientRect();

// const x = Math.floor(Math.random()*(fieldRect.width-CARROT_SIZE));
// const y = Math.floor(Math.random()*(fieldRect.height-CARROT_SIZE));

function initGame() {
  addItem('carrot', 5, 'img/carrot.png');
  addItem('bug', 5, 'img/bug.png');
}

function addItem (className, count, imgPath) {
  // const x1=0;
  // const y1=0;
  // const x2=fieldRect.width;
  // const y2=fieldRect.height;
  for(let i=0; i<count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = Math.floor(Math.random()*(fieldRect.width-CARROT_SIZE));
    const y = Math.floor(Math.random()*(fieldRect.height-CARROT_SIZE));
    // const x = randomNumber(x1, x2);
    // const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    gameField.appendChild(item);
  }
}

// function randomNumber(min, max) {
//   return Math.random() * (max-min) + min;
// }

initGame();

const playBtn = document.querySelector('.play__button');
playBtn.addEventListener('click', ()=>{
  initGame();
})
