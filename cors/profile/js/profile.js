'use strict';

const content = document.querySelector('.content');

function initProfile(data) {
  for (const key in data) {
    switch(key) {
      case 'id':
        loadData('initTech', `https://neto-api.herokuapp.com/profile/${data[key]}/technologies`);
        break;
      case 'pic':
        document.querySelector(`[data-${key}]`).src = data[key];
        break;
      default:
        document.querySelector(`[data-${key}]`).textContent = data[key];
    }
  }
}

function initTech(data) {
  const techStack = document.querySelector('[data-technologies]');
  for (const key in data) {
    const item = document.createElement('span');
    item.classList.add('devicons', `devicons-${data[key]}`);
    techStack.appendChild(item);
  }
}

function loadData(cb, url) {
  return new Promise((done, fail) => {
    window.cb = done;

    const script = document.createElement('script');
    script.src = `${url}?callback=${cb}`;
    document.body.appendChild(script);
  });
}

loadData('initProfile', 'https://neto-api.herokuapp.com/profile/me')
  .then(content.style.display = 'initial');