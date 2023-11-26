const guessField = document.getElementById("guessInput");
const attemptsDone = document.getElementById("attempts");
const preGuess = document.querySelector(".guesses");
const result = document.querySelector(".result");
const submitButton = document.querySelector(".submit-btn");

const randomNumber = parseInt(Math.random() * 100 + 1);

let attempts = 10;
let previousGuesses = [];

let playGame = true;

if (playGame) {
  submitButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = parseInt(guessField.value);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  if (isNaN(guess) || guess < 1 || guess > 100) {
    alert("Please enter a valid number between 1 and 100.");
  } else {
    attempts--;
    checkGuess(guess);
  }
}

function checkGuess(guess) {
  previousGuesses.push(guess);
  preGuess.textContent = previousGuesses.join(", ");
  attemptsDone.textContent = attempts;
  guessField.value = "";

  if (guess === randomNumber) {
    alert("Congrats! You got it right!");
    playGame = false;
    resetGame();
  } else if (attempts === 0) {
    alert("Sorry You Lose!");
    playGame = false;
    attemptsDone.textContent = "10";
    resetGame();
  } else if (guess < randomNumber) {
    alert("Number is Too low!");
  } else if (guess > randomNumber) {
    alert("Number is Too high!");
  }
}

function resetGame() {
  attempts = 10;
  previousGuesses = [];
  attemptsDone.textContent = attempts;
  preGuess.textContent = "None";
  guessField.value = "";
  playGame = true;
}
