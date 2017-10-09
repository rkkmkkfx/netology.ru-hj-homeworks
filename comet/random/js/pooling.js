'use strict';
const pooling = document.querySelectorAll('section.pooling > div');

function startPolling() {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', event => {
    if (event.target.responseText) {
      pooling.forEach(item => item.classList.remove('flip-it'));
      pooling[event.target.responseText - 1].classList.add('flip-it');
    }
  })

  xhr.open('GET', 'https://neto-api.herokuapp.com/comet/pooling');
  xhr.send();
}

setInterval(startPolling, 5000);
