'use strict';

function handleTableClick(event) {
  const th = event.target,
        table = event.currentTarget;

  let ths = document.querySelectorAll('th');


  Array.from(ths).forEach(item => {
    (item !== th) ? item.removeAttribute('data-dir') : false;
  });

  th.dataset.dir = th.dataset.dir ? -th.dataset.dir : 1;
  sortTable(th.dataset.propName, th.dataset.dir);

  table.dataset.sortBy = th.dataset.propName;
}
