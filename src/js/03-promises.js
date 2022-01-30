import Notiflix from 'notiflix';
Notiflix.Notify.init({
  useIcon: false,
});

let createdArrayPromise = [];


const formRef = document.querySelector('.form');
const inputDelayRef = document.querySelector('[name="delay"]');
const inputStepRef = document.querySelector('[name="step"]');
const inputAmountRef = document.querySelector('[name="amount"]');



formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  
  createdArrayPromise = [];
  createArray(inputAmountRef.value);

  createdArrayPromise.reduce((acc, delay) => { createPromise(acc, delay).then(onSuccses).catch(onError); acc += 1; return acc}, 1);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
  setTimeout( () => {
    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
    } else {
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }
  }, delay);
});
  
}


const onSuccses = value => {
  Notiflix.Notify.success(value);
};

const onError = error => {
  Notiflix.Notify.failure(error);
};


function createArray(number) {
  let delayPromise = Number(inputDelayRef.value);

  for (let i = 0; i < number; i += 1) {
    createdArrayPromise.push(delayPromise);
    delayPromise += Number(inputStepRef.value);
  }

  return createdArrayPromise;
}


