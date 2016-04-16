'use strict';
import test from 'ava';
import duration from './';

test('pendel.time should error when two timestrings are not supplied', t => {
	t.throws(() => {
		duration.time({}, {});
	}, 'pendel expects string arguments');
});

test('pendel.time should error when invalid timestrings are supplied', t => {
	t.throws(() => {
		duration.time('one', 'two');
	}, /Invalid time string format/);
});

test('pendel.time should get the time difference between two timestrings', t => {
	t.is(duration.time('1:00AM', '2:00AM').hours, 1);
	t.is(duration.time('1:30AM', '3:45AM').hours, 2);
	t.is(duration.time('1:30AM', '3:45AM').totalMinutes, 135);
	t.is(duration.time('1:00AM', '3:30AM').minutes, 30);
	t.is(duration.time('00:00', '23:59').hours, 23);
	t.is(duration.time('00:00', '23:59').minutes, 59);
	t.is(duration.time('12:00AM', '00:00').minutes, 0);
	t.is(duration.time('12:00AM', '00:12').minutes, 12);
	t.is(duration.time('8:00PM', '9:30PM').totalMinutes, 90);
});

test('pendel.time should support timestrings with seconds', t => {
	t.is(duration.time('1:00:01 AM', '1:00:10 AM').seconds, 9);
	t.is(duration.time('1:00:05 AM', '1:00:03 AM').totalSeconds, 2);
	t.is(duration.time('1:00:01 AM', '2:00:01 AM').totalSeconds, 3600);
	t.is(duration.time('1:00:00 AM', '1:10:01 AM').totalSeconds, 601);
	t.is(duration.time('11:59:59AM', '13:38:39').totalSeconds, 5920);
	t.is(duration.time('11:59:59AM', '13:38:39').totalMinutes, 98);
	t.is(duration.time('11:59:59AM', '16:55:03').totalSeconds, 17704);
});

test('pendel.time should support both 12-hour and 24-hour formats', t => {
	t.is(duration.time('00:00', '11:59PM').hours, 23);
	t.is(duration.time('00:00', '11:59PM').minutes, 59);
	t.is(duration.time('12:00PM', '18:01').hours, 6);
	t.is(duration.time('12:00PM', '18:01').minutes, 1);
});

test('pendel.time should return specific units', t => {
	const diff = duration.time('1:00AM', '3:30AM');
	t.true(diff.hasOwnProperty("totalMinutes"));
	t.true(diff.hasOwnProperty("totalSeconds"));
	t.true(diff.hasOwnProperty("hours"));
	t.true(diff.hasOwnProperty("minutes"));
	t.true(diff.hasOwnProperty("seconds"));
});

test('pendel.date should error when two timestrings are not supplied', t => {
	t.throws(() => {
		duration.date('one', new Date());
	}, 'pendel.date expects two valid date strings');

	t.throws(() => {
		duration.date(new Date(), 'two');
	}, 'pendel.date expects two valid date strings');
});

test('pendel.date should get the time difference between two datestrings', t => {
	t.is(duration.date('01/01/00', '01/01/01').years, 1);
	t.is(duration.date('01/01/00', '02/02/00').months, 1);
	t.is(duration.date('01/01/00', '01/15/00').weeks, 2);
	t.is(duration.date('01/01/00', '01/15/00').days, 14);
	t.is(duration.date('01/01/00', '01/02/00').hours, 24);
	t.is(duration.date('01/01/00', '01/02/00').minutes, 24 * 60);
	t.is(duration.date('01/01/00', '01/02/00').seconds, 24 * 60 * 60);
});

test('pendel.date should accept Date objects', t => {
	const date1 = new Date(2016, 1, 1, 14, 0, 0);
	const date2 = new Date(2018, 2, 2, 16, 10, 10);

	t.is(duration.date(date1, date2).years, 2);
	t.is(duration.date(date1, date2).months, 25);
	t.is(duration.date(date1, date2).weeks, 108);
	t.is(duration.date(date1, date2).days, 760);
	t.is(duration.date(date1, date2).days, 760);
	t.is(duration.date(date1, date2).hours, 18242);
	t.is(duration.date(date1, date2).minutes, 1094530);
	t.is(duration.date(date1, date2).seconds, 65671810);
});

test('pendel.date should return specific units', t => {
	var diff = duration.date('01/01/01', '01/01/02');
	console.log(duration.date('01/01/01', '01/03/02'));
	t.true(diff.hasOwnProperty("years"));
	t.true(diff.hasOwnProperty("months"));
	t.true(diff.hasOwnProperty("weeks"));
	t.true(diff.hasOwnProperty("days"));
	t.true(diff.hasOwnProperty("hours"));
	t.true(diff.hasOwnProperty("minutes"));
	t.true(diff.hasOwnProperty("seconds"));
});
