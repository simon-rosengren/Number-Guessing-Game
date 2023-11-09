"use strict";

//----------------
// State variables
//----------------
let randomNumber = Math.floor(Math.random() * 10);
let guesses = 3;

//------------------
// Element variables
//------------------
let guessButtonEl = document.querySelector("#guessButton");
let playAgainButtonEl = document.querySelector("#playAgainButton");
let inputFieldEl = document.querySelector(".input-field");
let infoTextEl = document.querySelector(".info-text");
let guessesEl = document.querySelector(".guesses");

console.log(randomNumber);

//-----------
// Functions
//-----------
function handleGuess(e) {
  e.preventDefault();

  //Convert userGuess into a number
  let userGuess = Number(inputFieldEl.value);

  if (userGuess === randomNumber && checkNumber(userGuess) == true) {
    renderWon();
  } else if (userGuess < randomNumber && checkNumber(userGuess) === true) {
    renderHigher();
  } else if (userGuess > randomNumber && checkNumber(userGuess) === true) {
    renderLower();
  }

  if (guesses === 0) {
    renderLost();
  }
}

function handlePlayAgain(e) {
  e.preventDefault();

  //Get a new random number
  randomNumber = Math.floor(Math.random() * 10);

  //Reset guesses
  guesses = 3;

  guessButtonEl.hidden = false;
  inputFieldEl.disabled = false;
  inputFieldEl.value = "";
  infoTextEl.innerHTML = "Guess a number between 0 and 9";
  guessesEl.innerHTML = `You have ${guesses} guesses`;
  playAgainButtonEl.innerHTML = "Give Up";

  console.log(`randomNumber: ${randomNumber}`);
}

//Check if number is valid
function checkNumber(number) {
  if (inputFieldEl.value === "") {
    infoTextEl.innerHTML = "You have to guess something";
  } else if (number > 9) {
    infoTextEl.innerHTML = "I said a number between 0 and 9 :(";
    return false;
  } else if (number % 1 != 0) {
    infoTextEl.innerHTML = "Why would you guess that?";
    return false;
  } else {
    return true;
  }
}

function renderWon() {
  infoTextEl.innerHTML = "You guessed correctly! You Win!";
  guessesEl.innerHTML = "";
  guessButtonEl.hidden = true;
  inputFieldEl.disabled = true;
  playAgainButtonEl.innerHTML = "Play Again";
}

function renderHigher() {
  infoTextEl.innerHTML = "Higher!";
  guesses--;
  guessesEl.innerHTML = `You have ${guesses} guesses left`;
  inputFieldEl.value = "";
}

function renderLower() {
  infoTextEl.innerHTML = "Lower!";
  guesses--;
  guessesEl.innerHTML = `You have ${guesses} guesses left`;
  inputFieldEl.value = "";
}

function renderLost() {
  infoTextEl.innerHTML = "You Lost!";
  guessesEl.innerHTML = `You have ${guesses} guesses left`;
  guessButtonEl.hidden = true;
  inputFieldEl.disabled = true;
  playAgainButtonEl.innerHTML = "Try Again";
}

//----------------
// Event Listeners
//----------------
guessButtonEl.addEventListener("click", handleGuess);
playAgainButtonEl.addEventListener("click", handlePlayAgain);
