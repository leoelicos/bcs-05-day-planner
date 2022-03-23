const toggle = document.querySelector('.toggle');
toggle.addEventListener('click', (e) => {
	const html = document.querySelector('html');
	if (html.classList.contains('dark')) {
		html.classList.remove('dark');
	} else {
		html.classList.add('dark');
	}

	const main = document.querySelector('main');
	if (main.classList.contains('dark')) {
		main.classList.remove('dark');
	} else {
		main.classList.add('dark');
	}
});
