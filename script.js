const colorBox = document.querySelector(".colorBox");
const colorOptions = document.querySelectorAll(".colorOption");
const gameStatus = document.querySelector(".gameStatus");
const scoreDisplay = document.querySelector(".score");
const newGameButton = document.querySelector(".newGameButton");

let correctColor;
let score = 0;

function generateRandomBaseColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function generateShade(baseColor, factor) {
  const [r, g, b] = baseColor.match(/\d+/g).map(Number);
  
  const newR = Math.min(255, Math.max(0, Math.floor(r * factor)));
  const newG = Math.min(255, Math.max(0, Math.floor(g * factor)));
  const newB = Math.min(255, Math.max(0, Math.floor(b * factor)));

  return `rgb(${newR}, ${newG}, ${newB})`;
}

function setColors() {
  const baseColor = generateRandomBaseColor();
  correctColor = baseColor;
  colorBox.style.backgroundColor = correctColor;

  const colorChoices = [];
  for (let i = 0; i < colorOptions.length; i++) {
    const shadeFactor = 0.7 + Math.random() * 0.6; 
    colorChoices.push(generateShade(baseColor, shadeFactor));
  }

  const correctOptionIndex = Math.floor(Math.random() * colorOptions.length);
  colorChoices[correctOptionIndex] = correctColor; 

  colorOptions.forEach((button, index) => {
    button.style.backgroundColor = colorChoices[index];
    button.onclick = function () {
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
    setTimeout(startNewRound, 1000);
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
