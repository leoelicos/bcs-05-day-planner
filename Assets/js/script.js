const startDay = 9; // start at 9 am
const finishDay = 17; // finish at 5 pm

setInterval(() => {
	$('#currentDay').text(moment().format('dddd, MMMM Do'));
}, 86400000); // update timer every day

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
		article.addClass('row d-flex justify-content-center align-content-stretch col-12 ');

		section = $('<section>');
		section.addClass('hour p3 col-2');
		section.text(moment(i, 'H').format('h A'));
		article.append(section);

		textarea = $('<textarea>');
		textarea.addClass('col-8');
		if (i < moment().hour()) {
			textarea.addClass('past');
		} else if (i == moment().hour()) {
			textarea.addClass('present');
		} else {
			textarea.addClass('future');
		}
		article.append(textarea);

		button = $('<button>');
		button.addClass('saveBtn d-flex justify-content-center align-items-center p-3 col-2');
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

	//* display '9 AM saved to local storage' above .container
	var message = $('<p>');
	message.addClass('col-12');
	message.text(`${$(this).parents('article').children().eq(0).text()} was saved to local storage`);
	$('.container').before(message);
	setTimeout(() => {
		// delete after 1 second
		message.remove();
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
