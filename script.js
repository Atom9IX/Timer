// * Node elements
const timerContainerNode = document.querySelector(".timer-container");
const startBtnNode = document.querySelector(".start-btn");
const resetBtnNode = document.querySelector(".reset-btn");
const inputs = document.querySelector(".inputs");
const secondInput = document.querySelector(".seconds");
const minuteInput = document.querySelector(".minutes");
const hourInput = document.querySelector(".hours");

let timer = {
  time: {
    seconds: 0,
    minutes: 0,
    hours: 0,
  },
  stopStatus: true,
};

// * Functions
function show(element) {
  element.setAttribute(
    "style",
    "text-align: center; margin: 10px; visibility: visible"
  );
}

function hide(element) {
  element.setAttribute(
    "style",
    "text-align: center; margin: 10px; visibility: hidden"
  );
}

function render() {
  timerContainerNode.textContent = `${Math.round(
    timer.time.hours
  )} : ${Math.round(timer.time.minutes)} : ${Math.round(timer.time.seconds)}`;
}

function start() {
  reset();
  timer.stopStatus = false;
  hide(inputs);
}

function stop() {
  timer.stopStatus = true;
}

function reset() {
  stop();
  showStartBtn();
  show(inputs);
  timer.time.seconds = secondInput.value;
  timer.time.minutes = minuteInput.value;
  timer.time.hours = hourInput.value;
  while (timer.time.seconds > 59) {
    timer.time.seconds -= 60;
    timer.time.minutes++;
  }
  while (timer.time.minutes > 59) {
    timer.time.minutes -= 60;
    timer.time.hours++;
  }
  if (
    timer.time.seconds < 0 ||
    timer.time.minutes < 0 ||
    timer.time.hours < 0
  ) {
    stop();
    timerContainerNode.textContent = "negative number!";
    return;
  }
  render();
}

function hideStartBtn() {
  startBtnNode.setAttribute("style", "visibility: hidden");
  resetBtnNode.setAttribute("style", "position: relative; right: 25px");
}

function showStartBtn() {
  startBtnNode.setAttribute("style", "visibility: visible");
  resetBtnNode.setAttribute("style", "position: relative; right: 0px");
}

function activateTimer() {
  if (timer.stopStatus) {
    return;
  } else {
    timer.time.seconds--;
    if (timer.time.seconds < 0) {
      if (timer.time.minutes > 0) {
        timer.time.minutes--;
        timer.time.seconds = 59;
      } else {
        if (timer.time.hours > 0) {
          timer.time.hours--;
          timer.time.minutes = 59;
          timer.time.seconds = 59;
        } else {
          timerContainerNode.textContent = "END!";
          setTimeout(reset, 1000);
          showStartBtn();
          return;
        }
      }
    }
  }
  render();
}


// * Event listeners
startBtnNode.addEventListener("click", (e) => {
  start();
  hideStartBtn();
});

resetBtnNode.addEventListener("click", (e) => {
  reset();
});

// * Timer
setInterval(activateTimer, 1000);
show(inputs);
