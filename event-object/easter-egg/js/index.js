const nav = document.getElementsByTagName('nav')[0],
      secret = document.getElementsByClassName('secret')[0],
      secretCode = ['KeyY', 'KeyT', 'KeyN', 'KeyJ', 'KeyK', 'KeyJ', 'KeyU', 'KeyB', 'KeyZ'],
      inputArr = [];

function toggleNav(event) {
  if ((event.ctrlKey) && (event.altKey) && (event.code === 'KeyT')) {
    nav.classList.toggle('visible');
  } else {
    if (event.code === secretCode[inputArr.length]) {
      inputArr.push(event.code);
      if (inputArr.length === secretCode.length) {
        secret.classList.add('visible');
      }
    } else {
      inputArr.length = 0;
    }
  }
}

document.addEventListener('keydown', toggleNav);