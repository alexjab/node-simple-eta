'use strict';

export const MODE_SPEEDS = { // km/h
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

export function inferModeOfTransportFromDistance(distance) {
  if (distance > 1000) {
    return 'driving';
  }
  return 'walking';
};

export function getAverageSpeed(distance, modeOfTransport) {
  let meanSpeed = MODE_SPEEDS[modeOfTransport.toUpperCase()];
  let subjectiveDistance;

  if (distance < 1000) {
    return meanSpeed.SHORT * 1000 / 3600;
  }
  if (distance < 20000) {
    return meanSpeed.MEDIUM * 1000 / 3600;
  }
  return meanSpeed.LONG * 1000 / 3600;
};
