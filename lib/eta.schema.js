'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateConstructor = validateConstructor;
exports.validateModeOfTransport = validateModeOfTransport;
exports.validateCoordinates = validateCoordinates;

var _speed = require('./speed.js');

var speed = _interopRequireWildcard(_speed);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function validateConstructor(from, to) {
  if (!from && !to) return;

  if (!(from && from instanceof Array && from.length === 2 && typeof from[0] === 'number' && typeof from[1] === 'number')) {
    throw new Error('Expects an array of numbers of length 2' + '([latitude, longitude]) for parameter `from`');
  }

  if (!(!to || to && to instanceof Array && to.length === 2 && typeof to[0] === 'number' && typeof to[1] === 'number')) {
    throw new Error('Expects an array of numbers of length 2' + '([latitude, longitude]) for parameter `to`');
  }
}

function validateModeOfTransport(mode) {
  if (!mode) return;

  if (!speed.MODE_SPEEDS[mode.toUpperCase()]) {
    throw Error(mode + ' is not a valid mode of transport');
  }
}

function validateCoordinates(latitude, longitude) {
  var coords = undefined;
  if (latitude instanceof Array) {
    coords = latitude;
  } else {
    coords = [latitude, longitude];
  }
  if (typeof coords[0] === 'number' && typeof coords[1] === 'number' && coords.length === 2) return coords;

  if (latitude instanceof Array) {
    throw new Error('Expects an array of numbers of length 2 ([latitude, longitude])');
  }
  throw new Error('Expects 2 numbers as parameters (latitude, longitude)');
}