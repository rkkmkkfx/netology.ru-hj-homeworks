'use strict';

function initWidget(data) {
  for (const key in data) {
    if (key === 'wallpaper' || key === 'pic') {
      document.querySelector(`[data-${key}]`).src = data[key];
    } else {
      document.querySelector(`[data-${key}]`).textContent = data[key];
    }
  }
}

function loadData(url) {
  return new Promise((done, fail) => {
    window[initWidget] = done;

    const script = document.createElement('script');
    script.src = `${url}?callback=initWidget`;
    document.body.appendChild(script);
  });
}

loadData('https://neto-api.herokuapp.com/twitter/jsonp');