import Notiflix from 'notiflix';

const createdArrayPromise = [];


const formRef = document.querySelector('.form');
const inputDelayRef = document.querySelector('[name="delay"]');
const inputStepRef = document.querySelector('[name="step"]');
const inputAmountRef = document.querySelector('[name="amount"]');



formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  
  createArray(inputAmountRef.value);
  createdArrayPromise.reduce((acc, delay) => {createPromise(acc, delay)}, 1);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
  setTimeout( () => {
    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
    } else {
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }
  }, delay);
});
  
  return promise.then(
    value => {
      Notiflix.Notify.success(value); // "Success! Value passed to resolve function"
    })
    .catch(error => {
      Notiflix.Notify.failure(error);
    }); 

}





function createArray(number) {
  let delayPromise = Number(inputDelayRef.value);

  for (let i = 0; i < number; i += 1) {
    createdArrayPromise.push(delayPromise);
    delayPromise += Number(inputStepRef.value);
  }

  return createdArrayPromise;
}


