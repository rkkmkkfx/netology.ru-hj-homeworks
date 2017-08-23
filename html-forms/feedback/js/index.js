const form = document.querySelector('.contentform');

function filterDigits() {
  this.value = this.value.replace(/[^0-9\.]/g,'');
}

function formFilled() {
  const fields = document.querySelectorAll('input, textarea');
  for (const field of fields) {
    if (!field.value) {
      return true;
    }
  }
  return false;
}

form.zip.addEventListener('keyup', filterDigits);

form.querySelector('button').disabled = (!formFilled()) ? false : true;
