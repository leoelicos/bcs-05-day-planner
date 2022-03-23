const hourEl = document.querySelector('.clock-hour');
const minuteEl = document.querySelector('.minute');
const secondEl = document.querySelector('.second');
const timeEl = document.querySelector('.time');
const dateEl = document.querySelector('.date');

function setTime() {
	// analog time
	const now = moment();

	const hours = now.hour();
	const hoursForClock = hours % 12; // 12-hour clock

	const minutes = now.minute();
	const seconds = now.second();
	const ampm = hours >= 12 ? 'PM' : 'AM';

	var hoursDegree = degrees(hoursForClock, 0, 12, 0, 360);
	if (hoursDegree === 0) {
		hoursDegree = 360;
		hourEl.style.transition = `all 0s`;
	}
	hourEl.style.transform = `translate(-50%, -100%) rotate(${hoursDegree}deg)`;

	var minutesDegree = degrees(minutes, 0, 60, 0, 360);
	if (minutesDegree === 0) {
		minutesDegree = 360;
	}
	minuteEl.style.transform = `translate(-50%, -100%) rotate(${minutesDegree}deg)`;

	var secondsDegree = degrees(seconds, 0, 60, 0, 360);
	if (secondsDegree === 0) {
		secondsDegree = 360;
	}
	secondEl.style.transform = `translate(-50%, -100%) rotate(${secondsDegree}deg)`;

	// digital time
	timeEl.innerHTML = `${hoursForClock === 0 ? 12 : hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
}

// map minutes to degrees
const degrees = (x, x1, x2, y1, y2) => {
	return ((x - x1) * (y2 - y1)) / (x2 - x1) + y1;
};

setTime();

setInterval(setTime, 1000);
