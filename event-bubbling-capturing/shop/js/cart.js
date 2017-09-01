'use strict';

list.addEventListener('click', event => {
  event.preventDefault();
  const btn = event.target;
  btn.classList.contains('add-to-cart') ? addToCart({title: btn.dataset.title, price: btn.dataset.price}) : false;
});