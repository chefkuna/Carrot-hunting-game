'use strict';

const carrotsound = new Audio('./sound/carrot_pull.mp3');
const alertsound = new Audio('./sound/alert.wav');
const bgsound = new Audio('./sound/bg.mp3');
const bugsound = new Audio('./sound/bug_pull.mp3');
const winsound = new Audio('./sound/game_win.mp3');

export function playCarrot() {
  playSound(carrotsound);
}

export function playBug() {
  playSound(bugsound);
}

export function playAlert() {
  playSound(alertsound);
}

export function playWin() {
  playSound(winsound);
}

export function playBackground() {
  playSound(bgsound);
}

export function stopBackground() {
  stopSound(bgsound);
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}