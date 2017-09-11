'use strict';

const url = 'https://neto-api.herokuapp.com/food/42';

const widget = {
  pic: document.querySelector('[data-pic]'),
  title: document.querySelector('[data-title]'),
  ingredients: document.querySelector('[data-ingredients]'),
  rating: document.querySelector('[data-rating]'),
  star: document.querySelector('[data-star]'),
  votes: document.querySelector('[data-votes]'),
  consumers: document.querySelector('[data-consumers]')
}

const source = [
  {
    url: url,
    funcName: 'getInfo'
  },{
    url: `${url}/rating`,
    funcName: 'getRating'
  },{
    url: `${url}/consumers`,
    funcName: 'listUsers'
  }
];

function getInfo(data) {
  widget.pic.style.backgroundImage = `url('${data.pic}')`;
  widget.title.textContent = data.title;
  widget.ingredients.textContent = data.ingredients.join(', ');
}

function getRating(data) {
  let units = '';
  let votes = data.votes;
  votes %= 100;
  if (votes >= 5 && votes <= 20) {
    units = 'оценок';
  }
  votes %= 10;
  if (votes === 1) {
    units = 'оценка';
  } else if (votes >= 2 && votes <= 4) {
    units = 'оценки';
  } else {
    units = 'оценок';
  }

  widget.star.style.width = `${(data.rating / 10) * 100}%`;
  widget.rating.textContent = data.rating.toFixed(2);
  widget.votes.textContent = `(${data.votes} ${units})`;
}

function listUsers(data) {
  const total = document.createElement('span');
  total.textContent = `(+${data.total})`;

  data.consumers.forEach(item => {
    const user = document.createElement('img');
    user.src = item.pic;
    user.title = item.name;
    widget.consumers.appendChild(user);
  });

  widget.consumers.appendChild(total);
}

source.forEach((item) => {
  loadData(item.funcName, item.url);
});

function loadData(cb, url) {
  return new Promise((done, fail) => {
    window.cb = done;

    const script = document.createElement('script');
    script.src = `${url}?callback=${cb}`;
    document.body.appendChild(script);
  });
}