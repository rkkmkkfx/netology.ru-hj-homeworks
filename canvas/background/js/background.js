const canvas = document.getElementById('wall'),
      ctx = canvas.getContext('2d'),
      amount = {
        min: 50,
        max: 200
      },
      size = {
        min: .1,
        max: .6
      },
      speed = {
        min: -.2,
        max: .2
      },
      totalAmount = Math.floor(Math.random() * (amount.max/2 - amount.min/2) + amount.min/2),
      circles = new Array(totalAmount),
      crosses = new Array(totalAmount);

class Figure {
  constructor(size) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * (size.max - size.min) + size.min;
  }

  get nextPoint() {
    if (Math.round(Math.random())) {
      return (x, y, time) => {
        return {
          x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
          y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
        };
      }
    } else {
      return (x, y, time) => {
        return {
          x: x + Math.sin((x + (time / 10)) / 100) * 5,
          y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
        }
      }
    }
  }

  addTo(set) {
    set.shift();
    set.push(this);
  }
}

class Circle extends Figure {
  constructor(size) {
    super(size);
    this.radius = this.size * 12;
  }
}

class Cross extends Figure {
  constructor(size, speed) {
    super(size);
    this.side = this.size * 20;
    this.speed = ((Math.random() * (speed.max - speed.min)) + speed.min);
    this.angle = Math.random() * 360;
  }
}

for (const circle of circles) {
  new Circle(size).addTo(circles);
}

for (const cross of crosses) {
  new Cross(size, speed).addTo(crosses);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'white';

  circles.forEach(circle => {
    let point = circle.nextPoint(circle.x, circle.y, Date.now());
    ctx.beginPath();
    ctx.lineWidth = 5 * circle.size;
    ctx.arc(point.x, point.y, circle.radius , 0, 2*Math.PI);
    ctx.stroke();
  });

  crosses.forEach(cross => {
    let point = cross.nextPoint(cross.x, cross.y, Date.now());
    ctx.save();
    ctx.lineWidth = 5 * cross.size;
    cross.angle = cross.angle + cross.speed;
    if (cross.angle > 360) cross.angle = cross.angle - 360;
    if (cross.angle < 0) cross.angle = 360 + cross.angle;
    ctx.translate(point.x, point.y);
    ctx.beginPath();
    ctx.rotate(cross.angle * Math.PI / 180);
    ctx.strokeRect(0, -cross.size * cross.side/2, 0, cross.size * cross.side);

    ctx.beginPath();
    ctx.rotate(Math.PI / 2);
    ctx.strokeRect(0, -cross.size * cross.side/2, 0, cross.size * cross.side);
    ctx.restore();
  })
}

function tick () {
  update();
  setTimeout(tick, 50);
}

tick();