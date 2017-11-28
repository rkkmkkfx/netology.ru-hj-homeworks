'use strict';

const app = document.querySelector('.app');
const list = document.querySelector('.list');
const controls = app.querySelector('.controls');
const button = document.getElementById('take-photo');
const error = document.getElementById('error-message');

const video = document.createElement('video');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

app.appendChild(video);

function el(tagName, attributes, children) {
  const element = document
    .createElement(tagName);
  if (attributes instanceof Object) {
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

function renderThumb(img) {
  return el('figure', null, [
    el('img', {src: img}),
    el('figcaption', null, [
      el('a', {href: img, download: 'snapshot.png'}, [
        el('i', {class: 'material-icons'}, 'file_download')
      ]),
      el('a', null, [
        el('i', {class: 'material-icons'}, 'file_upload')
      ]),
      el('a', null, [
        el('i', {class: 'material-icons'}, 'delete')
      ])
    ])
  ])
}

function upload(img) {
  const data = new FormData();
  const blob = dataURItoBlob(img.src);
  data.append('image', blob);
  return fetch('https://neto-api.herokuapp.com/photo-booth', {
    method: 'POST',
    body: data
  });
}

function dataURItoBlob(dataURI) {
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const array = [];
  const byteString = atob(dataURI.split(',')[1]);

  for(let i = 0; i < byteString.length; i++) {
    array.push(byteString.charCodeAt(i));
  }

  return new Blob([new Uint8Array(array)], { type: mimeString });
}

function handleClick(event) {
  const btnType = event.target.innerText;
  const figure = event.target.closest('figure');
  if (btnType !== 'file_download') {
    event.preventDefault();
    switch (btnType) {
      case 'file_upload' :
        const img = figure.querySelector('img');
        upload(img)
          .then(res => {
          if (200 <= res.status && res.status < 300) {
            event.target.parentNode.style.visibility = 'hidden';
          }
        })
          .catch(err => {
            error.style.display = 'block';
            error.textContent = err;
          });
        break;
      case 'delete' :
        figure.remove();
        break;
    }
  } else {
    event.target.parentNode.style.visibility = 'hidden';
  }
}

function takePhotoFrom(video) {
  setTimeout(() => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);

    const imgData = canvas.toDataURL();

    const thumb = renderThumb(imgData);
    thumb.querySelectorAll('a').forEach(item => {
      item.addEventListener('click', handleClick);
    });
    list.prepend(thumb);
  }, 100)
}



navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then(stream => {
    video.srcObject = stream;
    video.play();
    controls.style.display = 'flex';
    button.addEventListener('click', () => takePhotoFrom(video));
  })
  .catch(err => {
    error.style.display = 'block';
    error.textContent = err;
  })