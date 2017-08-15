const list = document.querySelector('.contacts-list');

function getList() {
  let content = '';
  const data = JSON.parse(loadContacts());
  for (const item of data) {
    content += `<li data-email="${item.email}" data-phone="${item.phone}">
        <strong>${item.name}</strong>
      </li>`
  }
  return content;
}

list.innerHTML = getList();

