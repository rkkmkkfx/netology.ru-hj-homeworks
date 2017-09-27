'use strict';

function el(tagName, attributes, children) {
  const element = document
    .createElement(tagName);
  if (typeof attributes === 'object') {
    Object.keys(attributes).forEach(i => {
      element.setAttribute(i, attributes[i])
    });
  }
  if (typeof children === 'string') {
    element.textContent = children;
  } else if (children instanceof Array) {
    children.forEach(child => element
      .appendChild(child));
  }
  return element;
}

function showComments(list) {
  const commentsContainer = document.querySelector('.comments');
  const comments = list.map(createComment);
  for (const comment of comments) {
    commentsContainer.appendChild(comment);
  }
}

function createComment(comment) {
  let textdata = comment.text.split('\n').join('<br>'),
    date = new Date(comment.date).toLocaleString('ru-Ru');

  return el('div', {class: 'comment-wrap'}, [
    el('div', {class: 'photo', title: comment.author.name},
      el('div', {class: 'avatar', style: `background-image: url('${comment.author.pic}')`})
    ),
    el('div', {class: 'comment-block'}, [
      el('p', {class: 'comment-text'}, textdata),
      el('div', {class: 'bottom-comment'}, [
        el('div', {class: 'comment-date'}, date),
        el('ul', {class: 'comment-actions'}, [
          el('li', {class: 'complain'}, 'Пожаловаться'),
          el('li', {class: 'reply'}, 'Ответить')
        ])
      ])
    ])
  ]);
  /*return `<div class="comment-wrap">
    <div class="photo" title="${comment.author.name}">
      <div class="avatar" style="background-image: url('${comment.author.pic}')"></div>
    </div>
    <div class="comment-block">
      <p class="comment-text">
        ${comment.text.split('\n').join('<br>')}
      </p>
      <div class="bottom-comment">
        <div class="comment-date">${new Date(comment.date).toLocaleString('ru-Ru')}</div>
        <ul class="comment-actions">
          <li class="complain">Пожаловаться</li>
          <li class="reply">Ответить</li>
        </ul>
      </div>
    </div>
  </div>`*/
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
