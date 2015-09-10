'use strict';

var twentyfour = require('twelve-to-twentyfour');

module.exports = function(timestr1, timestr2){

    if (typeof timestr1 !== 'string' || typeof timestr2 !== 'string'){
        throw new Error('Invalid parameters passed to pendel');
    }

    var time1 = twentyfour(timestr1);
    var time2 = twentyfour(timestr2);

    if (!time1 || !time2){
        throw new Error("Invalid times sent to pendel");
    }

    time1 = time1.split(':').map(function(n){ return parseInt(n, 10); });
    time2 = time2.split(':').map(function(n){ return parseInt(n, 10); });

    // force the seconds onto times that don't have them.
    if (time1.length === 2){ time1[2] = 0; }
    if (time2.length === 2){ time2[2] = 0; }

    // put the largest number first
    var totalSeconds1 = time1[0]*60*60 + time1[1]*60 + time1[2];
    var totalSeconds2 = time2[0]*60*60 + time2[1]*60 + time2[2];

    var results = {};

    if (totalSeconds1 > totalSeconds2){
        results.totalSeconds = totalSeconds1 - totalSeconds2;
    } else {
        results.totalSeconds = totalSeconds2 - totalSeconds1;
    }

    results.hours = Math.floor(results.totalSeconds/60/60);
    results.minutes = Math.floor((results.totalSeconds/60)%60);
    results.seconds = Math.floor(results.totalSeconds%60);
    results.totalMinutes = results.hours*60 + results.minutes;

    return results;
};