let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsList = document.getElementById("laps");
function updateDisplay() {
  let time = elapsedTime;
  const hrs = Math.floor(time / 3600000);
  time %= 3600000;
  const mins = Math.floor(time / 60000);
  time %= 60000;
  const secs = Math.floor(time / 1000);
  display.textContent = `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}
function pad(number) {
  return number.toString().padStart(2, '0');
}
function startStopwatch() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 1000);
}
function stopStopwatch() {
  clearInterval(timerInterval);
}
startStopBtn.addEventListener("click", () => {
  if (!isRunning) {
    startStopwatch();
    startStopBtn.textContent = "Pause";
  } else {
    stopStopwatch();
    startStopBtn.textContent = "Start";
  }
  isRunning = !isRunning;
});
resetBtn.addEventListener("click", () => {
  stopStopwatch();
  elapsedTime = 0;
  isRunning = false;
  startStopBtn.textContent = "Start";
  updateDisplay();
  lapsList.innerHTML = '';
});
lapBtn.addEventListener("click", () => {
  if (!isRunning) return;
  const li = document.createElement("li");
  li.textContent = display.textContent;
  lapsList.appendChild(li);
});
updateDisplay();