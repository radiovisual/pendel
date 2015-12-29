'use strict';

var assert = require('assert');
var duration = require('./');

describe('pendel', function(){

    it ('should error when two timestrings are not supplied', function(done){

        assert.throws(function(){
            duration('one', 'two');
        });
        assert.throws(function(){
            duration('one', '1:00AM');
        });
        assert.throws(function(){
            duration('1:00AM', 'two');
        });
        done();
    });


    it('should get the time difference between two timestrings', function(done){

        assert.equal( duration('1:00AM', '2:00AM').hours, 1);
        assert.equal( duration('1:30AM', '3:45AM').hours, 2);
        assert.equal( duration('1:30AM', '3:45AM').totalMinutes, 135);
        assert.equal( duration('1:00AM', '3:30AM').minutes, 30);
        assert.equal( duration('00:00', '23:59').hours, 23);
        assert.equal( duration('00:00', '23:59').minutes, 59);
        assert.equal( duration('12:00AM', '00:00').minutes, 0);
        assert.equal( duration('12:00AM', '00:12').minutes, 12);
        assert.equal( duration('8:00PM', '9:30PM').totalMinutes, 90);
        done();

    });

    it('should support timestrings with seconds', function(done){

        assert.equal( duration('1:00:01 AM', '1:00:10 AM').seconds, 9);
        assert.equal( duration('1:00:05 AM', '1:00:03 AM').totalSeconds, 2);
        assert.equal( duration('1:00:01 AM', '2:00:01 AM').totalSeconds, 3600);
        assert.equal( duration('1:00:00 AM', '1:10:01 AM').totalSeconds, 601);
        assert.equal( duration('11:59:59AM', '13:38:39').totalSeconds, 5920);
        assert.equal( duration('11:59:59AM', '13:38:39').totalMinutes, 98);
        assert.equal( duration('11:59:59AM', '16:55:03').totalSeconds, 17704);
        done();

    });


    it('should support both 12-hour and 24-hour formats', function(done){

        assert.equal( duration('00:00', '11:59PM').hours, 23);
        assert.equal( duration('00:00', '11:59PM').minutes, 59);
        assert.equal( duration('12:00PM', '18:01').hours, 6);
        assert.equal( duration('12:00PM', '18:01').minutes, 1);
        done();

    });


});


describe('return values', function(){

    it('totalMinutes', function(){
        assert( duration('1:00AM', '3:30AM').hasOwnProperty("totalMinutes") );
    });

    it('totalSeconds', function(){
        assert( duration('1:00AM', '3:30AM').hasOwnProperty("totalSeconds") );
    });

    it('hours', function(){
        assert( duration('1:00AM', '3:30AM').hasOwnProperty("hours") );
    });

    it('minutes', function(){
        assert( duration('1:00AM', '3:30AM').hasOwnProperty("minutes") );
    });

    it('seconds', function(){
        assert( duration('1:00AM', '3:30AM').hasOwnProperty("seconds") );
    });


});





