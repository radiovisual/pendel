# pendel [![Build Status](https://travis-ci.org/radiovisual/pendel.svg)](https://travis-ci.org/radiovisual/pendel)

> Get the time difference between two date strings or two time strings.

**[Pendel](https://de.wikipedia.org/wiki/Pendel):** German word for pendulum. 

## v2.0

Version 2.0 introduces support for getting the difference in `Date` objects or date strings, which introduces some
breaking changes to the API. Namely, you now need to use `pendel.time()` to get the difference between two timestrings
and a `pendel.date()` function has been added. Please see the API notes below for more information. 


## Install

```
$ npm install --save pendel
```


## Usage

```js
const duration = require('pendel');

// Difference in CLOCK TIMES
duration.time('1:00AM', '3:30AM');
/* 
  { 
    hours:3,
    minutes:30,
    seconds:0,
    totalSeconds:1100,
    totalMinutes:210
  }
*/

// Difference in CALENDAR DATES
duration.date('01/01/01', '01/03/02');
/* 
  { years: 1,
    months: 12,
    weeks: 52,
    days: 367,
    hours: 8808,
    minutes: 528480,
    seconds: 31708800
  }
*/
```


## API

### `pendel.time(startTime, endTime)`

Get the time difference between `startTime` and `endTime`

Returns an `object` with the following time properties:

Property | Description
:--- | :---
`hours` | The difference in hours
`minutes` | The difference in minutes
`seconds` | The difference in seconds
`totalSeconds` | The total elapsed time in seconds
`totalMinutes` | The total elapsed time in minutes


#### startTime

*Required*  
Type: `string`


#### endTime

*Required*  
Type: `string`

**Note:** `startTime` & `endTime` can be in any of the following 12-hour or 24-hour formats:

12-hour formats: *(space after time optional)*

- `1:00 AM`
- `1:00AM`
- `1:00:00 AM`
- `1:00:00AM`

24-hour formats:

- `00:00`
- `00:00:00`


### `pendel.date(startDate, endDate)`

Get the elapsed (delta) time between startDate and endDate

Returns an `object` with the following Date properties:

Property | Description
:--- | :---
`years` | The difference in years
`months` | The difference in months
`weeks` | The difference in weeks
`days` | The total elapsed time in days
`hours` | The total elapsed time in hours
`minutes` | The total elapsed time in minutes
`seconds` | The total elapsed time in seconds


#### startDate

*Required*  
Type: `datestring|Date`

The datestring or `Date` object you want to use as the start date.


#### endDate

*Required*  
Type: `datestring|Date`

The datestring or `Date` object you want to use as the end date.


## License

MIT @ [Michael Wuergler](http://www.numetriclabs.com)


