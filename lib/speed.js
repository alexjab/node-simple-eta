'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inferModeOfTransportFromDistance = inferModeOfTransportFromDistance;
exports.getAverageSpeed = getAverageSpeed;
var MODE_SPEEDS = exports.MODE_SPEEDS = { // km/h
  DRIVING: {
    SHORT: 30,
    MEDIUM: 50,
    LONG: 90
  },
  WALKING: {
    SHORT: 4,
    MEDIUM: 4,
    LONG: 4
  }
};

function inferModeOfTransportFromDistance(distance) {
  if (distance > 1000) {
    return 'driving';
  }
  return 'walking';
};

function getAverageSpeed(distance, modeOfTransport) {
  var meanSpeed = MODE_SPEEDS[modeOfTransport.toUpperCase()];
  var subjectiveDistance = undefined;

  if (distance < 1000) {
    return meanSpeed.SHORT * 1000 / 3600;
  }
  if (distance < 20000) {
    return meanSpeed.MEDIUM * 1000 / 3600;
  }
  return meanSpeed.LONG * 1000 / 3600;
};