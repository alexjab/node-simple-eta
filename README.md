# node-simple-eta
An approximate, API-less, ETA library

This library gives you the ETA (Estimated Time of Arrival) to get from a starting point to a destination point;
the ETA returned is simply based on an __approximate__ of the distance between the two points and speed.

This library is released under the MIT license.

## TL;DR
```
const eta = require('simple-eta');
eta([48.835527, 2.286271], [48.889798, 2.301743]).get();

// returns { distance: 7167, duration: 516, mode: 'driving' }
// IS

// All methods
eta()
	.from([48.835527, 2.286271])
	.to([48.889798, 2.301743])
	.waypoint(48.87171565, 2.273826599)
	.get();
// returns { distance: 8987, duration: 647, mode: 'driving' }
```

Methods:

Name         | Description
-------------|------------
`from()`     | Specifies a starting point
`to()`       | Specifies a destination point
`waypoint()` | Adds a waypoint to the list of waypoints
`get()`      | Gets the ETA (the computed distance, duration and mode of transportation)

## The approximate distance
The distance used is the __computed__ [Manhattan distance](https://en.wikipedia.org/wiki/Taxicab_geometry) between the starting and destination points.

## Mode of transportation and speed
Two modes of transportation are available at teh moment: _walking_ and _driving_.

Approximate speeds are used according to the following rules:

_Walking_: __4 km/h__

_Driving_:

 Distance (m) | Speed (km/h)
--------------|-------------
 < 1000       | __30__
 < 20000      | __50__
 >= 20000     | __90__
 
If you do not explicitely specify a mode of transportation, the library will infer it from the overall distance according to the following rules:

 Distance (m) | Mode of transportation
--------------|-----------------------
 < 2000       | walking
 >= 2000      | driving

## Advised use cases
My advice would be to use it in __non-critical__ applications, in applications in which ETAs __do not__ have a leading role, in which ETAs only come as support, in which ETAs are only __purely informative__.

This library is released under the __MIT license__.

## API

### simpleETA([from], [to])
Creates a new ETA object.

Parameters:

 - `(optional) from`: `Array of Number`,
 - `(optional) to`: `Array of Number`.

Example:

```
const simpleETA = require('simple-eta');

simpleETA();
simpleETA([48.835527, 2.286271]);
simpleETA([48.835527, 2.286271], [48.889798, 2.301743]);
// returns {...}
```

### #from(arrayOfCoordinates), #from(latitude, longitude)
Specifies a starting point.

Parameters:

 - `arrayOfCoordinates`: `Array of Number`,

or

 - `latitude`: `Array of Number`,
 - `longitude`: `Array of Number`.

Example:

```
simpleETA().from([48.835527, 2.286271]);
simpleETA().from(48.835527, 2.286271);
// returns {...}
```

### #to(arrayOfCoordinates), #to(latitude, longitude)
Specifies a destination point.

Parameters:

 - `arrayOfCoordinates` : `Array of Number`,

or

 - `latitude`: `Array of Number`,
 - `longitude`: `Array of Number`.

Example:

```
simpleETA().to([48.835527, 2.286271]);
simpleETA().to(48.835527, 2.286271);
// returns {...}
```

### #waypoint(arrayOfCoordinates), #waypoint(latitude, longitude)
Adds a waypoint to the list of waypoints.

Parameters:

 - `arrayOfCoordinates` : `Array of Number`,

or

 - `latitude`: `Array of Number`,
 - `longitude`: `Array of Number`.

Example:

```
eta(...).waypoint([48.87171565, 2.273826599]);
eta(...).waypoint(48.87171565, 2.273826599);
// returns {...}
```

### #get([modeOfTransportation])
Gets the ETA (the computed distance, duration and mode of transportation).

Parameters:

 - `(optional) modeOfTransporation`: `walking`, `driving`. If you do not explicitely set this parameter, its value will be infered according to the rules explained above.

Example:

```
simpleETA([48.835527, 2.286271], [48.889798, 2.301743]).get();
// returns { distance: 7167, duration: 516, mode: 'driving' }

simpleETA([48.835527, 2.286271], [48.889798, 2.301743]).get('walking');
// returns { distance: 7167, duration: 6450, mode: 'walking' }
```

## Running the tests
The library has been written in ES2015, but is distributed in ES5.

Running the tests will first build the library, that is transpiling the files in `./src` from ES2015 to ES5 to `./lib`.

```
npm test
```

If you want to build it only, just run:

```
npm run build
```

## License (MIT)
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.