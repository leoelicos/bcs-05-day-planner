const startDay = 9; // start at 9 am
const finishDay = 17; // finish at 5 pm
$('#clock').text(moment().format('mm:hh:ss'));
$('#currentDate').text(moment().format('D'));
$('#title').text(moment().format('dddd'));
$('#currentDay').text(moment().format('dddd'));
$('#currentMonthAndYear').text(moment().format('MMMM YYYY').toUpperCase());

setInterval(() => {
	$('#currentDate').text(moment().format('D'));
	$('#currentDay').text(moment().format('dddd'));
	$('#currentMonthAndYear').text(moment().format('MMMM YYYY').toUpperCase());
}, 1000); // update timer every second

// this api gets location from IP
fetch('https://api.ipregistry.co/?key=gcrxqclxi4uxdhh1')
	.then(function (response) {
		return response.json();
	})
	.then(function (payload) {
		$('#location').text(payload.location.city);
		// this api gets weather data from city
		fetch(`https://api.openweathermap.org/data/2.5/weather?q=${payload.location.city}&appid=7ae5b68863caa66f4b1e781f1cb996d0&units=metric`)
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				const { main, name, sys, weather } = data;
				var figureEl = $('#weather-container');
				var imgEl = $('#weather-icon');
				imgEl.attr('src', `https://openweathermap.org/img/wn/${weather[0]['icon']}@2x.png`);
				var temperatureEl = $('#weather-temperature');
				temperatureEl.append(`${Math.round(main.temp)}°C`);
				var descriptionEl = $('#weather-description');
				descriptionEl.append(`${weather[0]['description']}`);
				var headerEl = $('#header-right');
				headerEl.append(figureEl);
				// console.log(`main = ${Math.round(main.temp)}°C, name = ${name}, sys = ${sys.country}, weather = ${weather[0]['description']}`);
			});
	});

init();

function init() {
	// get container
	var container = $('.container');
	var textarea;
	var icon;
	var button;

	// append timeblocks
	for (var i = startDay; i <= finishDay; i++) {
		article = $('<article>');
		article.attr('id', `hour${i}`);

		section = $('<section>');
		section.addClass('timeblock-hour');
		section.text(moment(i, 'H').format('h A'));
		article.append(section);

		textarea = $('<textarea>');
		textarea.addClass('timeblock-textarea');
		if (i < moment().hour()) {
			textarea.addClass('past');
		} else if (i == moment().hour()) {
			textarea.addClass('present');
		} else {
			textarea.addClass('future');
		}
		article.append(textarea);

		button = $('<button>');
		button.addClass('timeblock-save');
		button.attr('data-descr', '');
		addSaveListener(button);
		icon = $('<i>');
		icon.addClass('fa-solid fa-floppy-disk');
		button.append(icon);
		article.append(button);
		// append event listener to button
		container.append(article);
	}
	renderHours();
}

function addSaveListener(element) {
	element.on('click', saveToLocalStorage);
}

function saveToLocalStorage() {
	//* get local storage object called 'workDaySchedule'
	var workDaySchedule = [];
	workDaySchedule = localStorage.getItem('workDaySchedule');

	var id = $(this).parents('article').attr('id');
	var text = $(this).parents('article').children().eq(1).val();

	//* if local storage object exists, parse it
	workDaySchedule === null ? (workDaySchedule = []) : (workDaySchedule = JSON.parse(workDaySchedule));

	//* if hour already exists, filter it out
	workDaySchedule = workDaySchedule.filter((hour) => hour.hour != id);

	//* push hour to workDaySchedule
	workDaySchedule.push({ hour: id, text: text });

	//* if text is empty, filter it out
	workDaySchedule = workDaySchedule.filter((text) => text.text.length != 0);

	//* stringify workDaySchedule and set as local storage object
	localStorage.setItem('workDaySchedule', JSON.stringify(workDaySchedule));

	//* display a message 'Saved' that disappears after 1 second
	console.log(this);
	$(this).attr('data-description', 'Saved!');
	setTimeout(() => {
		$(this).attr('data-description', '');
	}, 1000);

	//* render the items so the changes are made
	renderHours();
}

function renderHours() {
	//* create a temporary variable to store JSON
	var workDaySchedule = localStorage.getItem('workDaySchedule');

	//* convert JSON to array
	workDaySchedule = JSON.parse(workDaySchedule);

	if (workDaySchedule != null) {
		workDaySchedule.forEach((hour) => {
			var article = $(`#${hour.hour}`);
			article.children().eq(1).text(`${hour.text}`);
		});
	}
}
