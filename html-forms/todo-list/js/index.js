const list = document.querySelector('.list-block'),
      items = list.querySelectorAll('input'),
      output = list.querySelector('output');

function countTasks() {
  output.value = `${Array.from(items).filter(item => item.checked).length} из ${items.length}`;
  list.classList.toggle('complete', (Array.from(items).filter(item => item.checked).length === items.length));
}

countTasks();

for (const item of items) {
  item.addEventListener('click', countTasks);
}