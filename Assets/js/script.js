// update timer
$('#currentDay').text(moment().format('dddd, MMMM Do'));

init();

function init() {
	// get container
	var container = $('.container');
	var textarea;
	var icon;
	var button;
	// append timeblocks
	for (var i = 9; i <= 17; i++) {
		article = $('<article>');
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
		icon = $('<i>');
		icon.addClass('fa-solid fa-floppy-disk');
		button.append(icon);
		article.append(button);

		container.append(article);
	}
}
