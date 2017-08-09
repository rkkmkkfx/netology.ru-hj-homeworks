const srcs = ['breuer-building.jpg', 'guggenheim-museum.jpg', 'headquarters.jpg', 'IAC.jpg', 'new-museum.jpg'],
      target = document.getElementById('currentPhoto');

target.src = `i/${srcs[0]}`;

function next() {
  let currentSrc = target.src.split('/')[target.src.split('/').length - 1],
    currentSrcIndex = srcs.indexOf(currentSrc);
  if (currentSrcIndex < srcs.length - 1) {
    target.src = `i/${srcs[currentSrcIndex + 1]}`
  } else {
    target.src = `i/${srcs[0]}`
  }
}
function prev() {
  let currentSrc = target.src.split('/')[target.src.split('/').length - 1],
    currentSrcIndex = srcs.indexOf(currentSrc);
  if (currentSrcIndex > 0) {
    target.src = `i/${srcs[currentSrcIndex - 1]}`
  } else {
    target.src = `i/${srcs[srcs.length - 1]}`
  }
}

document.getElementById('nextPhoto').onclick = next;
document.getElementById('prevPhoto').onclick = prev;