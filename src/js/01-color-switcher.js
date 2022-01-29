let timerId = null;

const buttonStartRef = document.querySelector('[data-start]');
const buttonStopRef = document.querySelector('[data-stop]');

buttonStopRef.setAttribute('disabled', true);

buttonStartRef.addEventListener('click', onClickStart);
buttonStopRef.addEventListener('click', onClickStop);

function onClickStart(e) { 
    setBackgroundColor();
    timerId = setInterval(setBackgroundColor, 1000);
    buttonStartRef.setAttribute('disabled', true);
    buttonStopRef.removeAttribute('disabled');
}

function setBackgroundColor() {
    document.querySelector('body').style.backgroundColor = getRandomHexColor();
}
 
function onClickStop (e) {
    buttonStartRef.removeAttribute('disabled');
    clearInterval(timerId);
    buttonStopRef.setAttribute('disabled', true);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}