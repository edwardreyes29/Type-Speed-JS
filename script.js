const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
// console.log(resetButton);
const theTimer = document.querySelector(".timer");
// console.log(theTimer.innerHTML);

// TODO: Add wpm score
// TODO: add array of texts to test
// TODO: add highscore board
// TODO: add number of errors.


var timer = [0,0,0,0]; // minutes, seconds, 100th of sec, 1000th of sec
var interval;
var timerRunning = false;
// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9) {
      time = "0" + time; // time = {0,1,...,9}
    }
    return time;
}


// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":"
                    + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60); // Get minutes
    // (timer[0] * 60) when timer hits a minute, will reset to zero!
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60)); // seconds
    // subtract every hundreth of a second and everytime it hits a minute
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000)); // hundreth of seconds
}

// Match the text entered with the provided text on the page:
function spellCheck() {
  /*
    blue line- correct
    orange line - wrong
    green - perfect match
  */
  let textEntered = testArea.value;
  let originTextMatch = originText.substring(0,textEntered.length); // https://goo.gl/eekryj

  if(textEntered == originText) { // If text exactly matches orignal text
    clearInterval(interval); // https://goo.gl/4V01Vb
    testWrapper.style.borderColor = "#429890";
  } else {
    if (textEntered == originTextMatch) {
      testWrapper.style.borderColor = "#65CCF3"; // If substring matches orignal text
    } else {
      testWrapper.style.borderColor = "#E95D0f"; // If substring does not match original text
    }
  }
}

// Start the timer:
function start() {
  // console.log("key has been pressed!");
  let textEnteredLength = testArea.value.length;
  if (textEnteredLength === 0 && !timerRunning) {
      timerRunning = true;
      interval = setInterval(runTimer, 10); // 10 -> every thousanth of a second, 1000 -> seconds
  }
  console.log(textEnteredLength);
}

// Reset everything:
function reset() {
  console.log("reset buton has been pressed");
  clearInterval(interval); // here, it ensures browser is not running interval in the bg.
  interval = null; /* When we reassign interval, were not setting up a new
  index number. */
  timer = [0,0,0,0];
  timerRunning = false;

  testArea.value = "";
  theTimer.innerHTML = "00:00:00";
  testWrapper.style.borderColor = "grey";
}

// Event listeners for keyboard input and the reset button:
// console.log(testArea);
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);


// 1. Detect the very first keystroke to start the timer.
// 2. Match the text to the originText.
