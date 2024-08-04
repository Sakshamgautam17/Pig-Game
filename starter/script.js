'use strict';
//elements initially
const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const btnroll = document.querySelector('.btn--roll');
const diceEL = document.querySelector('.dice');
const activeEL0 = document.querySelector('.player--0');
const activeEL1 = document.querySelector('.player--1');
const holdEL = document.querySelector('.btn--hold');

let currentscore = 0;
let activeplayer = 0;
let dice = 0;
let hold = 0;
let scores = [0, 0];
let play = true;

//initially

score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add('hidden');

//roll dice

btnroll.addEventListener('click', function () {
  //generate random number
  if (play) {
    dice = Math.trunc(Math.random() * 6) + 1;
    //change display
    diceEL.src = `dice-${dice}.png`;
    diceEL.classList.remove('hidden');

    //edit the currentscore
    if (dice !== 1) {
      currentscore += dice;

      document.getElementById(`current--${activeplayer}`).textContent =
        currentscore;
    } else {
      document.getElementById(`current--${activeplayer}`).textContent = 0;
      activeplayer = activeplayer === 0 ? 1 : 0;
      currentscore = 0;
      activeEL0.classList.toggle('player--active');
      activeEL1.classList.toggle('player--active');
    }
  }
});

holdEL.addEventListener('click', function () {
  if (play) {
    scores[activeplayer] += currentscore;
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];
    document.getElementById(`current--${activeplayer}`).textContent = 0;
    if (scores[activeplayer] >= 100) {
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
      diceEL.classList.add('hidden');
      play = false;
    } else {
      activeEL0.classList.toggle('player--active');
      activeEL1.classList.toggle('player--active');
      currentscore = 0;
      activeplayer = activeplayer === 0 ? 1 : 0;
    }
  }
});

document.querySelector('.btn--new').addEventListener('click', function () {
  document
    .querySelector(`.player--${activeplayer}`)
    .classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  diceEL.classList.add('hidden');

  currentscore = 0;
  activeplayer = 0;
  dice = 0;
  hold = 0;
  scores = [0, 0];
  play = true;
});
