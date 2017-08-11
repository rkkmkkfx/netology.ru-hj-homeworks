const view  = document.getElementById('view'),
      nav   = document.getElementById('nav'),
      links = nav.getElementsByTagName('a');

function setCurrent(event) {
  event.preventDefault();
  view.src = this.href;
  view.title = this.getElementsByTagName('img')[0].title;
  for (let link of links) {
    link.classList.remove('gallery-current');
  }
  this.classList.add('gallery-current');
}

for (let link of links) {
  link.addEventListener('click', setCurrent);
}