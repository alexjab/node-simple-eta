'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateConstructorFromTo = validateConstructorFromTo;
exports.validateCoordinates = validateCoordinates;
function validateConstructorFromTo(from, to) {
  if (!from && !to) return;

  if (!(!from || from && from instanceof Array && from.length === 2 && typeof from[0] === 'number' && typeof from[1] === 'number')) {
    throw new Error('Expects an array of numbers of length 2' + '([latitude, longitude]) for parameter `from`');
  }

  if (!(!to || to && to instanceof Array && to.length === 2 && typeof to[0] === 'number' && typeof to[1] === 'number')) {
    throw new Error('Expects an array of numbers of length 2' + '([latitude, longitude]) for parameter `to`');
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