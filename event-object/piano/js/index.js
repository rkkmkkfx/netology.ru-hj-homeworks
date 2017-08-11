const sounds  = ['first', 'second', 'third', 'fourth', 'fifth'],
      set     = document.getElementsByClassName('set')[0],
      keys    = set.getElementsByTagName('li');

function playSounds(folder) {
  Array.from(keys).forEach((key, index) => {
    const sound = key.getElementsByTagName('audio')[0];
    sound.src = `sounds/${folder}/${sounds[index]}.mp3`;
    key.addEventListener('click', () => {
      sound.play();
    })
  });
}

function selectOctave(event) {
  if (event.altKey) {
    set.className = 'set higher';
    playSounds('higher');
  } else if (event.shiftKey) {
    set.className = 'set lower';
    playSounds('lower');
  } else {
    set.className = 'set middle';
    playSounds('middle');
  }
}

window.onload = () => {
  playSounds('middle');
};

document.addEventListener('keydown', selectOctave);
document.addEventListener('keyup', selectOctave);