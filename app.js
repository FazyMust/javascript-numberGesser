/*
GAME FUNCTIONS:
- Players must guess a number between min and max
- Players gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again 
*/

// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI Elements
const game = document.querySelector("div#game"),
  minNum = document.querySelector("span.min-num"),
  maxNum = document.querySelector("span.max-num"),
  guessBtn = document.querySelector("input#guess-btn"),
  guessInput = document.querySelector("input#guess-input"),
  message = document.querySelector(".message");

minNum.textContent = min;
maxNum.textContent = max;

// Play again Event Listner
game.addEventListener('mousedown', function(e){
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Listen for Guess
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
    guessInput.value = '';
    return;
  }

  // Check if Won
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  } else {
    // Wrong Number
    guessesLeft -= 1;

    // Check to see if there is any gesses left
    if (guessesLeft === 0) {
      // Game over - Lost

      gameOver(false,`Game Over, you lost. The Correct number was ${winningNum}`);

    } else {
      // Game continues - answer wrong

      // Change the border color
      guessInput.style.borderColor = "red";

      // Clear the Input 
      guessInput.value = "";
      // Tell user its the wrong answer and tell them how many guesses left
      setMessage(`${guess} is not Correct, ${guessesLeft} guesses left`, "red");
    }
  }

});
// Game Over
function gameOver(won, msg) {
  let color;
  won === true ? color = "green" : color = "red";

  // Disable Input
  guessInput.disabled = true;
  // Change the border color
  guessInput.style.borderColor = color;
  // Set Message of Loss
  setMessage(msg, color);

  // Play Again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// Get Random number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set Message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
