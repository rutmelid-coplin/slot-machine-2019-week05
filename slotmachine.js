//set vars for the elements
//set vars for the buttons
//button for 10 bet
//button for 100 bet
//function to hit the options
//function to check the result
//function to get the emoji spot after the spin

//declaring variables
const reels = [
  document.getElementById("emojiContainer1"),
  document.getElementById("emojiContainer2"),
  document.getElementById("emojiContainer3")
];

const bet10 = document.getElementById("bet10");
const bet100 = document.getElementById("bet100");
const balance = document.getElementById("balance");
const resultMessage = document.getElementById("resultMessage");
const emojis = ["👠", "👑", "💄", "💍", "🩰"];
const spinDuration = 700;
let isSpinning = false;

bet10.onclick = function () {
  options(10);
};

bet100.onclick = function () {
  options(100);
};

function options(amount) {
  let betAmount = amount;
  let currentBalance = parseInt(balance.value);

  if (isSpinning) return; //if TRUE return (leave the method) and ignore the rest of the code - if FALSE continue to the next line
  isSpinning = true;

  //iterating (going one by one) over the reels list
  reels.forEach((reel) => { //for each reel in the reels list do the following
    const randomStop = Math.floor(Math.random() * emojis.length) * -100; //randomly pick a emoji and multiply by -100 to move the reel up
    reel.style.transition = "transform 2s"; //set the transition time to 2 seconds
    reel.style.transform = `translateY(${randomStop}px)`; //move the reel to the random position
  });

  // Check result after all reels stop
  setTimeout(() => { // setTimeout is a method that waits for a certain amount of time before executing the code inside it - study more 
    checkResult(betAmount, currentBalance);
    isSpinning = false;
  },
    spinDuration);
}

//methods and logic
function checkResult(betAmount, currentBalance) {
  if (currentBalance === 0) {
    resultMessage.textContent = "Game Over!";
  }
  const emoji1 = getEmojiAfterSpin(reels[0]); //gets the first emoji from the reels array in line 2
  const emoji2 = getEmojiAfterSpin(reels[1]);
  const emoji3 = getEmojiAfterSpin(reels[2]);

  if (emoji1 === emoji2 && emoji2 === emoji3) { //if all three emojis are the same
    resultMessage.textContent = "You Win!";
    currentBalance += betAmount;
  } else {
    resultMessage.textContent = "Try again!";
    currentBalance -= betAmount;
  }
  balance.value = currentBalance;
}

function getEmojiAfterSpin(reel) {
  const translateY = parseInt(reel.style.transform.replace("translateY(", "").replace("px)", "")); //get the amount the reel has moved
  const emojiIndex = Math.abs(translateY / 100) % emojis.length; //calculate the index of the emoji based on the amount moved
  return emojis[emojiIndex];
}