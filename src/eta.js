'use strict';

const dists = require('./distances.js');
const speed = require('./speed.js');

function get(modeOfTransport) {
  if (!modeOfTransport) {
    modeOfTransport = speed.inferModeOfTransportFromDistance(this._distance);
  }

  const averageSpeed = speed.getAverageSpeed(this._distance, modeOfTransport);

  const duration = dists.getAverageETA(this._distance, averageSpeed);

  return {
    distance: Math.round(this._distance),
    duration: duration,
    mode: modeOfTransport
  };
};

function simpleEta(from, to) {
  const eta = {
    _coordinates: {
      lat1: from[0],
      long1: from[1],
      lat2: to[0],
      long2: to[1]
    },
    _distance: dists.getLonguestDistance(from[0], from[1], to[0], to[1])
  };

  eta.get = get;

  return eta;
};

module.exports = simpleEta;
