'use strict';

var twentyfour = require('twelve-to-twentyfour');
var moment = require('moment');
require('moment-range');

function getTimeDifference(timestr1, timestr2) {
	if (typeof timestr1 !== 'string' || typeof timestr2 !== 'string') {
		throw new Error('pendel expects string arguments');
	}

	var time1 = twentyfour(timestr1);
	var time2 = twentyfour(timestr2);

	if (!time1 || !time2) {
		throw new Error("Invalid times sent to pendel");
	}

	time1 = time1.split(':').map(function (n) {
		return parseInt(n, 10);
	});

	time2 = time2.split(':').map(function (n) {
		return parseInt(n, 10);
	});

	// force the seconds onto times that don't have them.
	if (time1.length === 2) {
		time1[2] = 0;
	}
	if (time2.length === 2) {
		time2[2] = 0;
	}

	// put the largest number first
	var totalSeconds1 = time1[0] * 60 * 60 + time1[1] * 60 + time1[2];
	var totalSeconds2 = time2[0] * 60 * 60 + time2[1] * 60 + time2[2];

	var results = {};

	if (totalSeconds1 > totalSeconds2) {
		results.totalSeconds = totalSeconds1 - totalSeconds2;
	} else {
		results.totalSeconds = totalSeconds2 - totalSeconds1;
	}

	results.hours = Math.floor(results.totalSeconds / 60 / 60);
	results.minutes = Math.floor((results.totalSeconds / 60) % 60);
	results.seconds = Math.floor(results.totalSeconds % 60);
	results.totalMinutes = results.hours * 60 + results.minutes;

	return results;
}

function getDateDifference(timestr1, timestr2) {
	// force into predictable date format
	var start = timestr1.toLocaleDateString ? timestr1 : new Date(timestr1);
	var end = timestr2.toLocaleDateString ? timestr2 : new Date(timestr2);

	if (start.toString() === 'Invalid Date' || end.toString() === 'Invalid Date') {
		throw new TypeError('pendel.date expects two valid date strings');
	}

	var dr = moment.range(start, end);

	var results = {};

	results.years = dr.diff('years');
	results.months = dr.diff('months');
	results.weeks = dr.diff('weeks');
	results.days = dr.diff('days');
	results.hours = dr.diff('hours');
	results.minutes = dr.diff('minutes');
	results.seconds = dr.diff('seconds');

	return results;
}

module.exports = {
	time: getTimeDifference,
	date: getDateDifference
};
