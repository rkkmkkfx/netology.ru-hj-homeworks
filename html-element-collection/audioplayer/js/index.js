const songs = ['LA%20Chill%20Tour.mp3', 'This%20is%20it%20band.mp3', 'LA%20Fusion%20Jam.mp3'],
      player    = document.getElementsByClassName('mediaplayer')[0],
      audio     = player.getElementsByTagName('audio')[0],
      playstate = player.getElementsByClassName('playstate')[0],
      prevSong  = player.getElementsByClassName('back')[0],
      nextSong  = player.getElementsByClassName('next')[0],
      stop      = player.getElementsByClassName('stop')[0],
      songTitle = player.getElementsByClassName('title')[0];

audio.src = `mp3/${songs[0]}`;

function changePlaystate() {
  if (player.classList.contains('play')) {
    audio.pause();
    player.classList.remove('play');
  } else {
    audio.play();
    player.classList.add('play');
  }
}

function stopPlayback() {
  if (player.classList.contains('play')) {
    audio.pause();
    player.classList.remove('play');
  }
  audio.currentTime = 0;
}

function next() {
  let currentSrc = audio.src.split('/')[audio.src.split('/').length - 1],
    currentSrcIndex = songs.indexOf(currentSrc);
  if (currentSrcIndex < songs.length - 1) {
    audio.src = `mp3/${songs[currentSrcIndex + 1]}`;
    songTitle.title = songs[currentSrcIndex + 1].split('%20').join(' ').replace('.mp3', '');
  } else {
    audio.src = `mp3/${songs[0]}`;
    songTitle.title = songs[0].split('%20').join(' ').replace('.mp3', '');
  }
  if (player.classList.contains('play')) {
    audio.play();
  }
}
function prev() {
  let currentSrc = audio.src.split('/')[audio.src.split('/').length - 1],
    currentSrcIndex = songs.indexOf(currentSrc);
  if (currentSrcIndex > 0) {
    audio.src = `mp3/${songs[currentSrcIndex - 1]}`;
    songTitle.title = songs[currentSrcIndex - 1].split('%20').join(' ').replace('.mp3', '');
  } else {
    songTitle.title = songs[songs.length - 1].split('%20').join(' ').replace('.mp3', '');
    audio.src = `mp3/${songs[songs.length - 1]}`
  }
  if (player.classList.contains('play')) {
    audio.play();
  }
}

playstate.onclick = changePlaystate;
stop.onclick = stopPlayback;
prevSong.onclick = prev;
nextSong.onclick = next;
audio.onended = next;