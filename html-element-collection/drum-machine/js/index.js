const drumKit = document.getElementsByClassName('drum-kit')[0],
      drums   = drumKit.getElementsByClassName('drum-kit__drum');

function playSample() {
  const sample = this.getElementsByTagName('audio')[0];
  sample.play();
}

for (let drum of drums) {
  drum.onclick = playSample;
}