'use strict';
let drawMode = false,
    updateCanvas = false,
    points = [],
    incSize = true,
    incHue = true,
    brushSize = 100,
    hue = 5;

const canvas = document.querySelector('canvas'),
      ctx = canvas.getContext('2d');

function init() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  points = [];
}

function draw(event) {
  if (drawMode) {
    incHue = event.shiftKey;
    const point = {
      coords: [event.offsetX, event.offsetY],
      brushSize: brushSize,
      hue: hue
    };
    points.push(point);
    updateCanvas = true;
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  let prevPoint = points[0];
  ctx.moveTo(...prevPoint.coords);
  for (const point of points) {
    if (prevPoint.lineEnd) {
      ctx.moveTo(...point.coords);
    } else {
      ctx.beginPath();
      ctx.lineWidth = point.brushSize;
      ctx.strokeStyle = `hsl(${point.hue}, 100%, 50%)`;
      ctx.quadraticCurveTo(...prevPoint.coords, ...point.coords);
      ctx.stroke();
    }
    prevPoint = point;
  }
}

function tick() {
  if (brushSize <= 5)  incSize = true;
  if (brushSize >= 100) incSize = false;
  (incSize) ? brushSize++ : brushSize --;
  if (hue > 359) hue = 0;
  incHue ? hue++ : hue--;
  if (updateCanvas) {
    update();
    updateCanvas = false;
  }
  window.requestAnimationFrame(tick);
}

function toggle() {
  drawMode = (event.type === 'mousedown');
  if (event.type === 'mouseup') points[points.length - 1].lineEnd = true;
}

init();

canvas.addEventListener('dblclick', init);
window.addEventListener('resize', init);

canvas.addEventListener('mousedown', toggle);
canvas.addEventListener('mouseup', toggle);
canvas.addEventListener('mouseleave', () => drawMode = false);


canvas.addEventListener('mousemove', draw);

tick();