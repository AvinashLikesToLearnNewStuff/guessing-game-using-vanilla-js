const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
let resetButton;

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

guessField.focus();

// Generate a random number between 1 and 100.
let randomNumber = getRandomInt(1,101);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

console.log("number that the computer generated = "+randomNumber);

// Record the turn number the player is on. Start it on 1.
let guessCount = 1;

// Provide the player with a way to guess what the number is.


// Once a guess has been submitted first record it somewhere so the user can see their previous guesses.
let previousGuesses = [];

// Next, check whether it is the correct number.
function checkGuess(){
  const userGuess = Number(guessField.value);
  if(guessCount===1){
    guesses.textContent = "previous guesses: ";
  }
  guesses.textContent += `${userGuess}`;

 if(userGuess===randomNumber){

   lastResult.textContent = "Congo u got it right";
   lastResult.style.backgroundColor ="green";
   lowOrHi.textContent = "";

   setGameOver();

}
 else if(guessCount===10){

   lastResult.textContent = "game over";
   lowOrHi.textContent = "";
   setGameOver();
}
 else{

   lastResult.textContent = "wrong";
   lastResult.style.backgroundColor ="red";
   if(userGuess<randomNumber){

   lowOrHi.textContent = "too low";
  }
   else if (userGuess>randomNumber) {

   lowOrHi.textContent = "too high";
  }

}
guessCount++;
guessField.value = "";
guessField.focus();
}


guessSubmit.addEventListener("click", checkGuess);

function setGameOver(){
  //disable the two buttons
 guessField.disabled = true;
 guessSubmit.disabled = true;

 //create reset button
resetButton = document.createElement('button');
resetButton.textContent = "start new game";
document.body.append(resetButton);

//make reset button reset the game
resetButton.addEventListener('click',resetGame);

}

function resetGame(){
  //put the guess count back to 1
  guessCount = 1 ;

  //empty all the information paragraphs
  const resetParas = document.querySelectorAll("resetParas p")
for (const resetPara of resetParas)
{
  resetPara.textContent = "";
}

//remove the reset button
resetButton.parentNode.removeChild(resetButton);

//enable form elements
 guessField.disabled = false;
 guessSubmit.disabled = false;
 guessField.value ="";
 guessField.focus();

//remove the bg color from last result paragraph
 lastResult.style.backgroundColor ="white";

//generate a new random number
 randomNumber = Math.floor(Math.random()*100)+1;
}


// If it is correct:
// Display congratulations message.
// Stop the player from being able to enter more guesses (this would mess the game up).
// Display control allowing the player to restart the game.
// If it is wrong and the player has turns left:
// Tell the player they are wrong and whether their guess was too high or too low.
// Allow them to enter another guess.
// Increment the turn number by 1.
// If it is wrong and the player has no turns left:
// Tell the player it is game over.
// Stop the player from being able to enter more guesses (this would mess the game up).
// Display control allowing the player to restart the game.
//Once the game restarts, make sure the game logic and UI are completely reset, then go back to step 1.

