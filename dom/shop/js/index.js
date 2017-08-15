const buttons = document.querySelectorAll('.add'),
      totalItems = document.querySelector('#cart-count'),
      totalPrice = document.querySelector('#cart-total-price');

function addToCart(event) {
  let currentItems = parseInt(totalItems.innerText),
      currentPrice = parseInt(totalPrice.innerText);
  totalItems.innerText = currentItems + 1;
  totalPrice.innerText = currentPrice + parseInt(event.target.dataset.price);
}

for (const button of buttons) {
  button.addEventListener('click', addToCart);
}