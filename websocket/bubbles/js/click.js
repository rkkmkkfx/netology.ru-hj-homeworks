'use strinct';

const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');

showBubbles(connection);

function sendClick(event) {
  const data = JSON.stringify({x: event.x, y: event.y});
  connection.send(data);
}

document.addEventListener('click', sendClick);

window.addEventListener('beforeunload', () => {
  connection.close(1000, 'Соединение закрыто');
});