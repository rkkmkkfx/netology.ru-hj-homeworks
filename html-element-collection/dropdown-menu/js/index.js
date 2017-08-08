const btn = Array.from(document.getElementsByClassName('wrapper-dropdown'))[0];

function toggleDropdown() {
  btn.classList.toggle('active');
}

btn.onclick = toggleDropdown;