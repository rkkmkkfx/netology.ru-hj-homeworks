'use strict';

function handleTableClick(event) {
  const th = event.target,
        table = event.currentTarget;

  let ths = document.querySelectorAll('th');
  ths = Array.from(ths).filter(item => {return item !== th});

  Array.from(ths).forEach(item => {
    item.removeAttribute('data-dir');
  });

  th.dataset.dir = th.dataset.dir ? -th.dataset.dir : 1;
  sortTable(th.dataset.propName, th.dataset.dir);

  table.dataset.sortBy = th.dataset.propName;
}
