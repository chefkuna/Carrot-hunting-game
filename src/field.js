'use strict';

const carrotsound = new Audio('./sound/carrot_pull.mp3');
const CARROT_SIZE = 80;

export default class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.gameField = document.querySelector('.game__field');
    this.fieldRect = this.gameField.getBoundingClientRect();

    this.gameField.addEventListener('click', this.onClick);
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  onClick(event) {
    if (event.target.matches('.carrot')) {
      event.target.remove();
      playSound(carrotsound);
      this.onItemClick && this.onItemClick('carrot');
    }
    else if (event.target.matches('.bug')) {
      this.onItemClick && this.onItemClick('bug');
    }
  }

  init() {
    this.gameField.innerHTML = '';
    this._addItem('carrot', this.carrotCount, 'img/carrot.png');
    this._addItem('bug', this.bugCount, 'img/bug.png');
  }

  _addItem (className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE - 40;
    for(let i=0; i<count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.gameField.appendChild(item);
    }
  }
}

function randomNumber(min, max) {
  return Math.random() * (max-min) + min;
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}