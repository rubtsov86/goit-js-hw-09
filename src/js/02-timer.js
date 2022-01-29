import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

let date = null;
let timerInterval = null;

const buttonStartRef = document.querySelector('[data-start]');
const counterDaysRef = document.querySelector('[data-days]');
const counterHoursRef = document.querySelector('[data-hours]');
const counterMinutesRef = document.querySelector('[data-minutes]');
const counterSecondsRef = document.querySelector('[data-seconds]');


buttonStartRef.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    
    if (options.defaultDate.getTime() > selectedDates[0].getTime()) {
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
    buttonStartRef.removeAttribute('disabled');
    date = selectedDates[0].getTime() - options.defaultDate.getTime();
  },
};

const fp = flatpickr("#datetime-picker", options);

buttonStartRef.addEventListener('click', onClickButtonStart);



function onClickButtonStart(e) {
  timerInterval = setInterval(timerStart, 1000);
  buttonStartRef.setAttribute('disabled', true);
}

function timerStart() {
  console.log(date);
  if (date <= 0 ) {
    clearInterval(timerInterval);
    return;
  }

  const time = convertMs(date);


  addLeadingZero(time);
  

  date -= 1000;
}

function addLeadingZero (time) {
  counterDaysRef.textContent = `${time.days}`.padStart(2, '0');
  counterHoursRef.textContent = `${time.hours}`.padStart(2, '0');
  counterMinutesRef.textContent = `${time.minutes}`.padStart(2, '0');
  counterSecondsRef.textContent = `${time.seconds}`.padStart(2, '0');
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

