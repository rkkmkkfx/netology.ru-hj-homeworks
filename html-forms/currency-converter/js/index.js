const loader = document.getElementById('loader'),
      content = document.getElementById('content'),
      selects = content.querySelectorAll('select'),
      first = document.getElementById('from'),
      second = document.getElementById('to'),
      source = document.getElementById('source'),
      result = document.getElementById('result');

loader.classList.remove('hidden');

const xhr = new XMLHttpRequest();
xhr.addEventListener("load", onLoad);
xhr.open("GET", "https://neto-api.herokuapp.com/currency", true);
xhr.send();

function convertCurrency() {
  const from = first.options[first.selectedIndex].value,
        to = second.options[second.selectedIndex].value;
  result.value = (source.value * from/to).toFixed(2);
}

function onLoad() {
  loader.classList.add('hidden');
  content.classList.remove('hidden');

  const data = JSON.parse(xhr.responseText);

  for (const el of selects) {
    for (const item of data) {
      const option = new Option(item.code, item.value);
      option.title = item.title;
      el.options.add(option);
    }
    el.addEventListener('change', convertCurrency);
  }
  convertCurrency();
  source.addEventListener('input', convertCurrency);
}

