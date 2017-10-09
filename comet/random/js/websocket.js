'use strict';
const websocket = document.querySelectorAll('section.websocket > div');

const connection = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');

connection.addEventListener('message', event => {
  websocket.forEach(item => item.classList.remove('flip-it'));
  websocket[event.data - 1].classList.add('flip-it');
});

window.addEventListener('beforeunload', () => connection.close(1000, 'Соединение закрыто'));