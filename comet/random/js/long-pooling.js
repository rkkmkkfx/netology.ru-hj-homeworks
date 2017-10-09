'use strict';
const longPooling = document.querySelectorAll('section.long-pooling > div');

function startLongPolling() {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', event => {
    if (event.target.responseText) {
      longPooling.forEach(item => item.classList.remove('flip-it'));
      longPooling[event.target.responseText - 1].classList.add('flip-it');
    }
    startLongPolling();
  })

  xhr.open('GET', 'https://neto-api.herokuapp.com/comet/long-pooling');
  xhr.send();
}

startLongPolling();