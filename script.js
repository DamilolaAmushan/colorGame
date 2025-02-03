const colorBox = document.querySelector(".colorBox");
const colorOptions = document.querySelectorAll(".colorOption");
const gameStatus = document.querySelector(".gameStatus");
const scoreDisplay = document.querySelector(".score");
const newGameButton = document.querySelector(".newGameButton");

let correctColor;
let score = 0;

function generateRandomColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor.padStart(6, "0")}`;
}

function setColors() {
  correctColor = generateRandomColor();
  colorBox.style.backgroundColor = correctColor;

  const colorChoices = [];
  for (let i = 0; i < colorOptions.length; i++) {
    const randomColor = generateRandomColor();
    colorChoices.push(randomColor);
  }

  const correctOptionIndex = Math.floor(Math.random() * colorOptions.length);
  colorChoices[correctOptionIndex] = correctColor;

  colorOptions.forEach((button, index) => {
    button.style.backgroundColor = colorChoices[index];
    button.onclick = function() {
      checkGuess(colorChoices[index]);
    };
  });
}

function checkGuess(selectedColor) {
  if (selectedColor === correctColor) {
    score++;
    gameStatus.textContent = "Correct!";
    gameStatus.style.color = "green";
    gameStatus.classList.add("correct-answer");
    gameStatus.addEventListener("animationend", () => {
      gameStatus.classList.remove("correct-answer", "wrong-answer");
    });
    colorOptions.forEach(button => button.disabled = true);
  } else {
    gameStatus.textContent = "Try again!";
    gameStatus.style.color = "red";
    gameStatus.classList.add("wrong-answer");
  }
  updateScore();
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

function startNewRound() {
  score = 0;
  updateScore();
  gameStatus.textContent = "Guess the color!";
  colorOptions.forEach(button => button.disabled = false);
  setColors();
}

newGameButton.addEventListener("click", startNewRound);

startNewRound();
