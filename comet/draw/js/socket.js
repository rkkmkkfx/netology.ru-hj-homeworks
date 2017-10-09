'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/draw');

function sendData(event) {
  event.canvas.toBlob(blob => connection.send(blob));
}

connection.addEventListener('open', () => editor.addEventListener('update', sendData));
connection.addEventListener('close', () => editor.removeEventListener('update', sendData));
connection.addEventListener('error', error => console.error(error.data));

window.addEventListener('beforeunload', () => connection.close(1000, 'Соединение закрыто'));