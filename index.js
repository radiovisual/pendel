'use strict';

var twentyfour = require('twelve-to-twentyfour');

module.exports = function(timestr1, timestr2){

    if (typeof timestr1 !== 'string' || typeof timestr2 !== 'string'){
        throw new Error('Invalid parameters passed to pendel');
    }

    var time1 = to24(timestr1);
    var time2 = to24(timestr2);

    if (!time1 || !time2){
        throw new Error("Invalid times sent to pendel");
    }

    time1 = time1.split(':').map(function(n){ return parseInt(n, 10); });
    time2 = time2.split(':').map(function(n){ return parseInt(n, 10); });

    //console.log("using", time1, time2);

    var results = {};

    results.totalMinutes = Math.abs((((time1[0]*60)+time1[1])-((time2[0]*60)+time2[1])));
    results.hours = Math.floor(results.totalMinutes/60);
    results.minutes = results.totalMinutes%60;
    results.totalSeconds = results.totalMinutes*60;

    return results;
};


function to24(str){

    // check if its already a 24-hour string
    var reg24 = /^[0-9]{2}:[0-9]{2}$/;
    if(reg24.test(str)){
        return str;
    }

    // check if its a 12-hour string
    var reg12 = /^[0-9]{1,2}:[0-9]{2}\s?(AM|PM)$/i;
    if(reg12.test(str)){
        return twentyfour(str);
    }

    return null;

}