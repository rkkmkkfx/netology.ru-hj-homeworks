'use strict';
const colorSwatch = document.getElementById('colorSwatch'),
      sizeSwatch = document.getElementById('sizeSwatch'),
      quickCart = document.getElementById('quick-cart');

const config = {
  method: 'GET',
  credentials: 'same-origin',
  headers: {
    'Content-Type' : 'application/json'
  }
};

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
    radio.checked = false;
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
    radio.disabled = !this.item.isAvailable;
    swatch.appendChild(radio);

    label.setAttribute('for', `swatch-0-${this.item.type}`);
    label.innerText = this.item.title;
    swatch.appendChild(label);

    img.className = 'crossed-out';
    img.src = 'https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886';
    label.appendChild(img);

    parent.appendChild(swatch);
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
    
    img.src = this.item.pic;
    img.title = this.item.title;
    wrap.appendChild(img);

    s1.style = 'background-color: #000; opacity: .5;';
    s1.className = 's1';
    s1.innerText = this.item.price;
    wrap.appendChild(s1);

    s2.className = 's2';
    wrap.appendChild(s2);
    
    parent.appendChild(product);
  }
}


fetch('https://neto-api.herokuapp.com/cart/colors', config)
  .then(res => res.json())
  .then(data => data.forEach(item => {
    const color = new Color(item);
    color.addTo(colorSwatch);
  }));

fetch('https://neto-api.herokuapp.com/cart/sizes', config)
  .then(res => res.json())
  .then(data => data.forEach(item => {
    const size = new Size(item);
    size.addTo(sizeSwatch);
  }));

fetch('https://neto-api.herokuapp.com/cart', config)
  .then(res => res.json())
  .then(data => data.forEach(item => {
    console.log(item);
    const cartItem = new Size(item);
    cartItem.addTo(quickCart);
  }));