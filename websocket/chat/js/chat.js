'use strict'
const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');

const chat = document.querySelector('.chat'),
      message = {
        box: chat.querySelector('.message-box'),
        input: chat.querySelector('.message-input'),
        submit: chat.querySelector('.message-submit'),
      },
      messages = chat.querySelector('.messages-content'),
      templates = chat.querySelector('.messages-templates'),
      template = {
        loading: templates.querySelector('.loading'),
        outgoing: templates.querySelector('.message-personal'),
        status: templates.querySelector('.message-status'),
        incoming: Array.from(templates.querySelectorAll('.message')).find(item => item.className === 'message')
      },
      userStatus = chat.querySelector('.chat-status');

class Message {
  constructor(tpl, messageText) {
    const item = template[tpl].cloneNode(true),
          text = item.querySelector('.message-text'),
          time = item.querySelector('.timestamp');
    text ? text.textContent = messageText : false;
    time ? time.textContent = this.getMessageTime() : false;

    this.message = item;
    this.tpl = tpl;
    this.messsageText = messageText;

    this.addTo(messages);
  }

  getMessageTime() {
    const time = new Date();
    return time.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  addTo(target) {
    target.appendChild(this.message);
    switch (this.tpl) {
      case 'outgoing' : {
        connection.send(this.messsageText);
        message.input.value = null;
        break
      }
      case 'incoming' : {
        target.querySelector('.loading').remove();
        break
      }
      case 'status' : {
        message.submit.disabled = !message.submit.disabled;
        userStatus.textContent = (userStatus.textContent === userStatus.dataset.online) ? userStatus.dataset.offline : userStatus.dataset.online;
        break
      }
    }
  }
}

function connectUser() {
  new Message('status', 'Пользователь появился в сети');
}

function receiveMessage() {
  if (event.data === '...') {
    new Message('loading');
  } else {
    new Message('incoming', event.data);

  }
}

function sendMessage() {
  if ((event.code === 'Enter' || event.target === message.submit) && !message.submit.disabled) {
    event.preventDefault();

    if (message.input.value) {
      new Message('outgoing', message.input.value);
    }
  }
}

function disconnectUser() {
  new Message('status', 'Пользователь не в сети')
}

connection.addEventListener('open', connectUser);
connection.addEventListener('message', receiveMessage);
message.submit.addEventListener('click', sendMessage);
message.input.addEventListener('keydown', sendMessage);
connection.addEventListener('close', disconnectUser);

window.addEventListener('beforeunload', () => {
  connection.close(1000, 'Соединение закрыто');
});