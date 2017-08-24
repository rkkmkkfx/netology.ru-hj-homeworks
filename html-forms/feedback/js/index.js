const form = document.querySelector('.contentform'),
      fields = document.querySelectorAll('input, textarea'),
      result = document.getElementById('output'),
      outputs = result.querySelectorAll('output'),
      buttons = document.querySelectorAll('button');

function filterDigits() {
  this.value = this.value.replace(/[^0-9\.]/g,'');
}

function formFilled() {
  for (const field of fields) {
    if (!field.value) {
      return false;
    }
  }
  return true;
}

form.zip.addEventListener('keyup', filterDigits);
form.addEventListener('input', () => {form.querySelector('button').disabled = (formFilled()) ? false : true});
for (const field of fields) {
  field.addEventListener('input', event => {
    const output = Array.from(outputs).find(item => {return item.id === event.target.name});
   if (output) output.value = event.target.value;
  });
}

form.querySelector('button').disabled = (formFilled()) ? false : true;
form.addEventListener('submit', event => {
  event.preventDefault();
});
for (const button of buttons) {
  button.addEventListener('click', event => {
    event.preventDefault();
    form.classList.toggle('hidden');
    result.classList.toggle('hidden');
  });
}
