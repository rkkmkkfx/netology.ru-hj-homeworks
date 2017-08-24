const buttons = document.querySelectorAll('.add'),
      totalItems = document.querySelector('#cart-count'),
      totalPrice = document.querySelector('#cart-total-price');
let currentItems = 0,
  currentPrice = 0;

function addToCart(event) {
  currentItems += 1;
  currentPrice = currentPrice + parseInt(event.target.dataset.price);
  totalItems.innerText = currentItems;
  totalPrice.innerText = getPriceFormatted(currentPrice);
}

for (const button of buttons) {
  button.addEventListener('click', addToCart);
}