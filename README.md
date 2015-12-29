# pendel [![Build Status](https://travis-ci.org/radiovisual/pendel.svg)](https://travis-ci.org/radiovisual/pendel)

> Get the time difference between two datetime strings

**[Pendel](https://de.wikipedia.org/wiki/Pendel):** German word for pendulum. 

:zap: **Important Note:** Version 1.0.0 of this module only supports time strings. *Support for calendar dates coming soon.*

## Install
```sh
$ npm install pendel
```

## Usage

```js
var duration = require('pendel');

duration('1:00AM', '3:30AM');
// => { hours:3, minutes:30, seconds:0, totalSeconds:1100, totalMinutes:210 }

duration('15:00', '16:00');
// => { hours:1, minutes:0, seconds:0, totalSeconds:3600, totalMinutes:60 }

duration('8:00PM', '9:30PM').totalMinutes;
// => 90

duration('1:00AM', '3:30AM').totalMinutes;
// => 150

duration('00:00:00', '00:00:10').totalSeconds;
// => 10

```

## API

### pendel(timestr1, timestr2)

Get the time difference between `timestr1` and `timestr2`

Returns: `object`

#### timestr1

*Required*

Type: `string`

#### timestr2

*Required*

Type: `string`

**Note:** `timestr1` & `timestr2` can be in any of the following 12-hour or 24-hour formats:

12-hour formats: *(space after time optional)*

- `1:00 AM`
- `1:00AM`
- `1:00:00 AM`
- `1:00:00AM`

24-hour formats:

- `00:00`
- `00:00:00`


## License

MIT @ [Michael Wuergler](http://www.numetriclabs.com)


