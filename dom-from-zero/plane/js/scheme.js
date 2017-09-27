'use strict'

const acSelect     = document.getElementById('acSelect'),
      btnSeatMap   = document.getElementById('btnSeatMap'),
      btnSetFull   = document.getElementById('btnSetFull'),
      btnSetEmpty  = document.getElementById('btnSetEmpty'),
      seatMapTitle = document.getElementById('seatMapTitle'),
      seatMapDiv   = document.getElementById('seatMapDiv'),
      totalPax     = document.getElementById('totalPax'),
      totalAdult   = document.getElementById('totalAdult'),
      totalHalf    = document.getElementById('totalHalf');

btnSetFull.disabled = true;
btnSetEmpty.disabled = true;

function getPlaneSchema(value) {
  fetch(`https://neto-api.herokuapp.com/plane/${value}`)
    .then(response => {
      if (200 <= response.status && response.status < 300) {
        return response;
      }
      throw new Error(response.statusText);
    })
    .then(result => result.json())
    .then(data => {
      seatMapTitle.textContent = `${data.title} (${data.passengers} пассажиров)`;
      initBtnSeatMap(data);
    });
}

function initBtnSeatMap(data) {
  btnSeatMap.addEventListener('click', (e) => {
    e.preventDefault();
    totalPax.textContent = totalAdult.textContent = totalHalf.textContent = 0;
    renderMap(data);
  });
}

function renderMap(data) {
  btnSetFull.disabled = false;
  btnSetEmpty.disabled = false;

  while (seatMapDiv.firstChild) {
    seatMapDiv.removeChild(seatMapDiv.firstChild);
  }

  data.scheme.forEach((item, i) => {
    const letters = item === 4 ? [].concat('', data.letters4, '') : ((item === 6) ? data.letters6 : []),
          row = el('div', {class: 'row seating-row text-center'}, [
            el('div', {class: 'col-xs-1 row-number'}, [
              el('h2', null, `${i + 1}`)
            ])
          ]);

    const leftCol = el('div', {class: 'col-xs-5'}),
          rightCol = el('div', {class: 'col-xs-5'});

    letters.forEach((letter, i) => {
      if (i <= 2) {
        leftCol.appendChild(renderSeat(letter));
      } else {
        rightCol.appendChild(renderSeat(letter));
      }
    });

    row.appendChild(leftCol);
    row.appendChild(rightCol);

    seatMapDiv.appendChild(row);
  });
}

function renderSeat(value) {
  if (value !== '') {
    const seat = el('div', {class: 'col-xs-4 seat'}, [
      el('span', {class: 'seat-label'}, value)
    ]);

    seat.addEventListener('click', selectSeat);

    return seat;
  } else {
    return el('div', {class: 'col-xs-4 no-seat'});
  }
}

function countTakenSeats() {
  const seats = seatMapDiv.querySelectorAll('.seat');

  Array.from(seats).forEach(item => {
    if (item.classList.contains('adult') || item.classList.contains('half')) {
      totalPax.textContent = (parseInt(totalPax.textContent) < seats.length) ? parseInt(totalPax.textContent) + 1 : seats.length;
    } else {
      totalPax.textContent = (parseInt(totalPax.textContent) > 0) ? parseInt(totalPax.textContent) - 1 : 0;
    }

    if (item.classList.contains('adult')) {
      totalAdult.textContent = (parseInt(totalAdult.textContent) < seats.length) ? parseInt(totalAdult.textContent) + 1 : seats.length;
    } else {
      totalAdult.textContent = (parseInt(totalAdult.textContent) > 0) ? parseInt(totalAdult.textContent) - 1 : 0;
    }

    if (item.classList.contains('half')) {
      totalHalf.textContent = (parseInt(totalHalf.textContent) < seats.length) ? parseInt(totalHalf.textContent) + 1 : seats.length;
    } else {
      totalHalf.textContent = (parseInt(totalHalf.textContent) > 0) ? parseInt(totalHalf.textContent) - 1 : 0;
    }
  });
}

function toggleAllSeats(event) {
  const seatList = seatMapDiv.querySelectorAll('.seat');

  event.preventDefault();
  for (const item of seatList) {
    if (item.classList.contains('half')) item.classList.remove('half');
    event.target === btnSetFull ? item.classList.add('adult') : item.classList.remove('adult', 'half');
  }

  countTakenSeats();
}

function selectSeat(event) {
  const seat = event.currentTarget;

  if (!seat.classList.contains('adult') && !event.altKey) {
    seat.classList.add('adult');
    totalPax.textContent = parseInt(totalPax.textContent) + 1;
    totalAdult.textContent = parseInt(totalAdult.textContent) + 1;
    if (seat.classList.contains('half')) {
      seat.classList.remove('half');
      totalHalf.textContent = parseInt(totalHalf.textContent) - 1;
      totalPax.textContent = parseInt(totalPax.textContent) - 1;
    }
  } else if (seat.classList.contains('adult') && !event.altKey) {
    seat.classList.remove('adult');
    totalPax.textContent = parseInt(totalPax.textContent) - 1;
    totalAdult.textContent = parseInt(totalAdult.textContent) - 1;
  }

  if (!seat.classList.contains('half') && event.altKey) {
    seat.classList.add('half');
    totalPax.textContent = parseInt(totalPax.textContent) + 1;
    totalHalf.textContent = parseInt(totalHalf.textContent) + 1;
    if (seat.classList.contains('adult')) {
      seat.classList.remove('adult');
      totalAdult.textContent = parseInt(totalAdult.textContent) - 1;
      totalPax.textContent = parseInt(totalPax.textContent) - 1;
    }
  } else if (seat.classList.contains('half') && event.altKey) {
    seat.classList.remove('half');
    totalPax.textContent = parseInt(totalPax.textContent) - 1;
    totalHalf.textContent = parseInt(totalHalf.textContent) - 1;
  }
}

function el(tagName, attributes, children) {
  const element = document
    .createElement(tagName);
  if (typeof attributes === 'object' && attributes !== null) {
    Object.keys(attributes).forEach(i => {
      element.setAttribute(i, attributes[i])
    });
  }
  if (typeof children === 'string') {
    element.textContent = children;
  } else if (children instanceof Array) {
    children.forEach(child => element
      .appendChild(child));
  }
  return element;
}

acSelect.addEventListener('change', event => getPlaneSchema(event.target.value));

document.addEventListener('DOMContentLoaded', getPlaneSchema(acSelect.value));

btnSetFull.addEventListener('click', toggleAllSeats);

btnSetEmpty.addEventListener('click', toggleAllSeats);