'use strict';

const MODE_SPEEDS = { // km/h
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
module.exports.MODE_SPEEDS = MODE_SPEEDS;

function inferModeOfTransportFromDistance(distance) {
  if (distance > 1000) {
    return 'driving';
  }
  return 'walking';
};
module.exports.inferModeOfTransportFromDistance = inferModeOfTransportFromDistance;

function getAverageSpeed(distance, modeOfTransport) {
  let meanSpeed = MODE_SPEEDS[modeOfTransport.toUpperCase()];
  let subjectiveDistance;

  if (distance < 1000) {
    return meanSpeed.SHORT * 1000 / 3600;
  } else if (distance < 20000) {
    return meanSpeed.MEDIUM * 1000 / 3600;
  } else {
    return meanSpeed.LONG * 1000 / 3600;
  }
};
module.exports.getAverageSpeed = getAverageSpeed;
