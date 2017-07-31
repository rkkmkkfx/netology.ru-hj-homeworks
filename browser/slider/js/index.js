const srcs = ['airmax.png', 'airmax-jump.png', 'airmax-on-foot.png', 'airmax-playground.png', 'airmax-top-view.png'];
let index = 0;

setInterval(() => {
	document.getElementById('slider').src = `i/${srcs[index]}`;
	if (index === 4) {index = 0} else index++;
}, 5000);