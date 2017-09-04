'use strict';
const counter = document.getElementById('counter'),
      btns = document.querySelector('.wrap-btns');

counter.textContent = localStorage.counter || 0;

function changeCounter(event) {
  switch (event.target.id) {
    case 'increment' :
      counter.textContent++;
      break
    case 'decrement' :
      (counter.textContent > 0) ? counter.textContent-- : false;
      break
    case 'reset' :
      counter.textContent = 0;
      break
  }
  localStorage.counter = counter.textContent;
}

btns.addEventListener('click', changeCounter);

