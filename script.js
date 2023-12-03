const guessField = document.getElementById("guessInput");
const attemptsDone = document.getElementById("attempts");
const preGuess = document.querySelector(".guesses");
const result = document.querySelector(".result");
const submitButton = document.querySelector(".submit-btn");

function generateRandomNumber() {
  return parseInt(Math.random() * 100 + 1);
}

let randomNumber = generateRandomNumber();

const h2 = document.createElement("h2");
h2.classList.add("alerts");
const resultSection = document.querySelector(".result-section");

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

function changeUi(message, backgroundColor) {
  h2.innerHTML = message;
  h2.style.backgroundColor = backgroundColor;
  resultSection.appendChild(h2);
}

function validateGuess(guess) {
  if (isNaN(guess) || guess < 1 || guess > 100) {
    changeUi("Please enter a valid number between 1 and 100.", "");
    resultSection.appendChild(h2);
    guessField.value = "";
  } else {
    if (resultSection.contains(h2)) {
      resultSection.removeChild(h2);
    }
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
    changeUi(`Game Over! The number was ${randomNumber}`, "");
    playGame = false;
    resetGame();
  } else if (guess < randomNumber) {
    changeUi("Number is Too low!", "");
  } else if (guess > randomNumber) {
    changeUi("Number is Too high!", "");
  }
}

function resetGame() {
  attempts = 10;
  attemptsDone.textContent = "10";
  previousGuesses = [];
  attemptsDone.textContent = attempts;
  preGuess.textContent = "None";
  guessField.value = "";
  randomNumber = generateRandomNumber();
  playGame = true;
}
