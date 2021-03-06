'use strict';
const connection = new WebSocket('wss://neto-api.herokuapp.com/counter'),
      connections = document.querySelector('.counter'),
      errors = document.querySelector('output.errors');

function getInfo(event) {
  const data = JSON.parse(event.data);
  connections.innerText = data.connections;
  errors.innerText = data.errors;
}

connection.addEventListener('message', getInfo);

window.addEventListener('beforeunload', () => {
  connection.close(1000, 'Соединение закрыто');
});
