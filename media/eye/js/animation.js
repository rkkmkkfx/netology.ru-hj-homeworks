'use strict';
const eyeBall = document.querySelector('.big-book__eye');
const eyePupil = document.querySelector('.big-book__pupil');

window.addEventListener('mousemove', event => {
  const bodyBCR = document.body.getBoundingClientRect();

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
    x: (eyeBallBCR.left - bodyBCR.left) + (eyeBallSize.width / 2),
    y: (eyeBallBCR.top - bodyBCR.top) + (eyeBallSize.height / 2)
  };

  function pupilPosition(axis) {
    const difference = mousePos[axis] - eyeBallCenterPosition[axis];
    if (difference === 0) return 0;

    const range = {
      from: -eyeBallCenterPosition[axis],
      to: windowSize[axis] - eyeBallCenterPosition[axis]
    }
    return (difference < 0) ? (-(difference / range.from) * 100) : ((difference / range.to) * 100);
  }

  const mousePos = {
    x: event.pageX,
    y: event.pageY
  };

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