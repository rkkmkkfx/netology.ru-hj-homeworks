'use strict';
const colorSwatch = document.getElementById('colorSwatch'),
      sizeSwatch = document.getElementById('sizeSwatch'),
      quickCart = document.getElementById('quick-cart'),
      form = document.getElementById('AddToCartForm'),
      swatches = form.querySelector('.swatches'),
      removeBtns = quickCart.querySelectorAll('.remove');

const formData = localStorage.form ? JSON.parse(localStorage.form) : {color: '', size: ''};

class Snippet {
  constructor(item) {
    this.item = item;
  }
}

class Color extends Snippet {
  addTo(parent) {
    const swatch = document.createElement('div'),
      tooltip = document.createElement('div'),
      radio = document.createElement('input'),
      label = document.createElement('label'),
      span = document.createElement('span'),
      img = document.createElement('img');

    swatch.className = `swatch-element color ${this.item.type} ${this.item.isAvailable ? 'available' : 'soldout'}`;
    swatch.dataset.value = this.item.type;

    tooltip.className = 'tooltip';
    tooltip.innerText = this.item.title;
    swatch.appendChild(tooltip);

    radio.setAttribute('quickbeam', 'color');
    radio.id = `swatch-1-${this.item.type}`;
    radio.type = 'radio';
    radio.name = 'color';
    radio.value = this.item.type;
    radio.checked = this.checked;
    swatch.appendChild(radio);

    label.setAttribute('for', `swatch-1-${this.item.type}`);
    label.style = `border-color: ${this.item.code};`;
    swatch.appendChild(label);

    span.style = `background-color: ${this.item.code};`;
    label.appendChild(span);

    img.className = 'crossed-out';
    img.src = 'https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886';
    label.appendChild(img);

    parent.appendChild(swatch);

    swatch.addEventListener('click', event => {
      formData.color = event.target.value;
      localStorage.form = JSON.stringify(formData);
    })
  };
}

class Size extends Snippet {
  addTo(parent) {
    const swatch = document.createElement('div'),
      radio = document.createElement('input'),
      label = document.createElement('label'),
      img = document.createElement('img');

    swatch.className = `swatch-element plain ${this.item.type} ${this.item.isAvailable ? 'available' : 'soldout'}`;
    swatch.dataset.value = this.item.type;

    radio.id = `swatch-0-${this.item.type}`;
    radio.type = 'radio';
    radio.name = 'size';
    radio.value = this.item.type;
    radio.checked = this.checked;
    radio.disabled = !this.item.isAvailable;
    swatch.appendChild(radio);

    label.setAttribute('for', `swatch-0-${this.item.type}`);
    label.innerText = this.item.title;
    swatch.appendChild(label);

    img.className = 'crossed-out';
    img.src = 'https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886';
    label.appendChild(img);

    parent.appendChild(swatch);

    swatch.addEventListener('click', event => {
      formData.size = event.target.value;
      localStorage.form = JSON.stringify(formData);
    })
  }
}

class CartItem extends Snippet {
  addTo(parent) {
    const product = document.createElement('div'),
          remove = document.createElement('span'),
          count = document.createElement('span'),
          wrap = document.createElement('div'),
          img = document.createElement('img'),
          s1 = document.createElement('span'),
          s2 = document.createElement('span');

    const cartIcon = document.getElementById('quick-cart-pay');

    product.id = `quick-cart-product-${this.item.id}`;
    product.className = 'quick-cart-product quick-cart-product-static';
    product.style = 'opacity: 1;';

    wrap.className = 'quick-cart-product-wrap';
    product.appendChild(wrap);

    count.className = 'count hide fadeUp';
    count.id = `quick-cart-product-${this.item.id}`;
    count.innerText = this.item.quantity;
    product.appendChild(count);

    remove.className = 'quick-cart-product-remove remove';
    remove.dataset.id = this.item.id;
    product.appendChild(remove);

    remove.addEventListener('click', event => {
      const data = new FormData();
      data.append('productId', event.target.dataset.id);
      const config = {
        body: data,
        method: 'POST',
        credentials: 'same-origin'
      };
      fetch('https://neto-api.herokuapp.com/cart/remove', config)
        .then(res => {
          if (200 <= res.status && res.status < 300) {
            return res;
          }
          throw new Error(res.statusText);
        })
        .then(res => res.json())
        .then(data => {
          if (data.error) throw new Error(data.message);
          quickCart.innerHTML = '';
          const totalPrice = data.reduce((total, item) => {return total + (item.price * item.quantity)}, 0);
          addCartIcon(totalPrice);

          data.forEach(item => {
            const cartItem = new CartItem(item);
            cartItem.addTo(quickCart);
          })
        })
        .catch(err => console.log(err));
    });


    img.src = this.item.pic;
    img.title = this.item.title;
    wrap.appendChild(img);
    s1.style = 'background-color: #000; opacity: .5;';

    s1.className = 's1';
    s1.innerText = `$${this.item.price.toFixed(2)}`;
    wrap.appendChild(s1);
    s2.className = 's2';

    wrap.appendChild(s2);

    parent.insertBefore(product, cartIcon);
  }
}

function addCartIcon(totalPrice) {
  const cartIcon = document.createElement('a'),
        span = document.createElement('span'),
        text = document.createElement('strong'),
        price = document.createElement('span');
  cartIcon.id = 'quick-cart-pay';

  cartIcon.setAttribute('quickbeam', 'cart-pay');
  cartIcon.className = `cart-ico${(totalPrice > 0) ? ' open' : ''}`;
  cartIcon.appendChild(span);

  text.className = 'quick-cart-text';

  text.innerHTML = 'Оформить заказ<br>';
  span.appendChild(text);
  price.id = 'quick-cart-price';

  price.innerText = `$${totalPrice.toFixed(2)}`;
  span.appendChild(price);
  quickCart.appendChild(cartIcon);
}

fetch('https://neto-api.herokuapp.com/cart/colors')
  .then(res => {
    if (200 <= res.status && res.status < 300) {
      return res;
    }
    throw new Error(res.statusText);
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) throw new Error(data.message);
    data.forEach(item => {
      const color = new Color(item);
      if (item.type === formData.color) color.checked = true;
      color.addTo(colorSwatch);
    })
  })
  .catch(err => console.log(err));

fetch('https://neto-api.herokuapp.com/cart/sizes')
  .then(res => {
    if (200 <= res.status && res.status < 300) {
      return res;
    }
    throw new Error(res.statusText);
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) throw new Error(data.message);
    data.forEach(item => {
      const size = new Size(item);
      if (item.type === formData.size) size.checked = true;
      size.addTo(sizeSwatch);
    })
  })
  .catch(err => console.log(err));

fetch('https://neto-api.herokuapp.com/cart')
  .then(res => {
    if (200 <= res.status && res.status < 300) {
      return res;
    }
    throw new Error(res.statusText);
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) throw new Error(data.message);
    const totalPrice = data.reduce((total, item) => {return total + (item.price * item.quantity)}, 0);
    addCartIcon(totalPrice);

    data.forEach(item => {
      const cartItem = new CartItem(item);
      cartItem.addTo(quickCart);
    });
  })
  .catch(err => console.log(err));

form.addEventListener('submit', event => {
  event.preventDefault();
  console.log(formData);
  localStorage.form = JSON.stringify(formData);
  const data = new FormData(event.target);
  data.append('productId', event.target.dataset.productId);
  const config = {
    body: data,
    method: 'POST',
    credentials: 'same-origin'
  };
  fetch('https://neto-api.herokuapp.com/cart', config)
    .then(res => {
      if (200 <= res.status && res.status < 300) {
        return res;
      }
      throw new Error(res.statusText);
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) throw new Error(data.message);
      quickCart.innerHTML = '';
      const totalPrice = data.reduce((total, item) => {return total + (item.price * item.quantity)}, 0);
      addCartIcon(totalPrice);

      data.forEach(item => {
        const cartItem = new CartItem(item);
        cartItem.addTo(quickCart);
      });
    })
    .catch(err => console.log(err));
});
