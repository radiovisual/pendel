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
        assert.equal( duration('1:30AM', '3:45AM').minutes, 15);
        assert.equal( duration('1:00AM', '3:30AM').totalMinutes, 150);
        assert.equal( duration('1:00AM', '3:30AM').totalSeconds, 150*60);
        assert.equal( duration('00:00', '23:59').hours, 23);
        assert.equal( duration('00:00', '23:59').minutes, 59);
        assert.equal( duration('12:00AM', '00:00').minutes, 0);
        assert.equal( duration('12:00AM', '00:12').minutes, 12);
        assert.equal( duration('8:00PM', '9:30PM').totalMinutes, 90);
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
        assert( duration('1:00AM', '3:30AM').totalMinutes );
    });

    it('totalSeconds', function(){
        assert( duration('1:00AM', '3:30AM').totalSeconds );
    });

    it('hours', function(){
        assert( duration('1:00AM', '3:30AM').hours );
    });

    it('minutes', function(){
        assert( duration('1:00AM', '3:30AM').minutes );
    });



});





