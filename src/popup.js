'use strict';

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector('.popup');
    this.popUpText = document.querySelector('.popup__result');
    this.popUpReplay = document.querySelector('.popup__replay');

    this.popUpReplay.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    })
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showWithText(text) {
    this.popUp.classList.remove('popup--hide');
    this.popUpText.innerText = text;
  }

  hide() {
    this.popUp.classList.add('popup--hide');
  }

}