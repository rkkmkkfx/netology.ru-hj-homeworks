const minStarsCount = 200,
      maxStarsCount = 400,
      minBrightness = .8,
      maxBrightness = 1,
      minStarSize   = 0,
      maxStarSize   = 1.1;

const starColors = ['#ffffff', '#ffe9c4', '#d4fbff']

const canvas = document.querySelector('canvas'),
      ctx = canvas.getContext('2d');

function addStar() {
  const x = Math.floor(Math.random() * canvas.width),
        y = Math.floor(Math.random() * canvas.height);

  ctx.globalAlpha = Math.random() * (maxBrightness - minBrightness) + maxBrightness;
  ctx.fillStyle = starColors[Math.floor(Math.random() * starColors.length)];
  ctx.beginPath();
  ctx.arc(x, y, (Math.random() * maxStarSize / 2), 0, 2 * Math.PI);
  ctx.fill();
}

function createStarField() {
  ctx.beginPath();
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const starsCount = Math.floor(Math.random() * (maxStarsCount - minStarsCount) + minStarsCount);
  for (let i = 0; i < starsCount; i++) {
    addStar();
  }
}

createStarField();

canvas.addEventListener('click', createStarField);