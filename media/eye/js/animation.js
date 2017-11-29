'use strict';
const eyeBall = document.querySelector('.big-book__eye');
const eyePupil = document.querySelector('.big-book__pupil');

window.addEventListener('mousemove', event => {
  const bodySize = document.body.getBoundingClientRect();

  const windowSize = {
    x: window.innerWidth,
    y: document.documentElement.clientHeight
  };

  const eyeBallBCR = eyeBall.getBoundingClientRect();
  const eyeBallSize = {
    width: eyeBallBCR.width,
    height: eyeBallBCR.height
  };

  const eyeBallCenterPosition = {
    x: (eyeBallBCR.left - bodySize.left) + (eyeBallSize.width / 2),
    y: (eyeBallBCR.top - bodySize.top) + (eyeBallSize.height / 2)
  };

  const mousePos = {
    x: event.pageX,
    y: event.pageY
  };

  function pupilPosition(axis) {
    const difference = mousePos[axis] - eyeBallCenterPosition[axis];
    if (difference === 0) return 0;

    const range = {
      from: (axis === 'x') ? -eyeBallCenterPosition[axis] : (eyeBallBCR.top + (eyeBallSize.height / 2)),
      to: (axis === 'x') ? windowSize[axis] - eyeBallCenterPosition[axis] : windowSize[axis] - (eyeBallBCR.bottom - (eyeBallSize.height / 2))
    }
    const relPos = {
      neg: (axis === 'x') ? (-(difference / range.from) * 100) : ((difference / range.from) * 100),
      pos: ((difference / range.to) * 100)
    }

    return (difference < 0) ? relPos.neg : relPos.pos;
  }

  const pupilPositionXPercent =  pupilPosition('x');
  const pupilPositionYPercent =  pupilPosition('y');

  const pupilSize = function () {
    const pointX = pupilPositionXPercent * Math.sign(pupilPositionXPercent);
    const pointY = pupilPositionYPercent * Math.sign(pupilPositionYPercent);

    const calculatedSize = ((100 - ((pointX + pointY) / 2)) * 0.03);

    return calculatedSize >= 1 ? calculatedSize : 1;
  };

  eyePupil.style.setProperty('--pupil-x', `${pupilPositionXPercent * 0.3}px`);
  eyePupil.style.setProperty('--pupil-y', `${pupilPositionYPercent * 0.3}px`);
  eyePupil.style.setProperty('--pupil-size', pupilSize());
});