'use strict';

import * as dists from './distances.js';
import * as speed from './speed.js';

function _get(modeOfTransport) {
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

function _from(from) {
  if (!from) return this;
  this._coordinates.from = from;

  if (!this._coordinates.to) return this;

  const args = [];
  args.push.apply(args, from);
  args.push.apply(args, this._coordinates.to);
  this._distance = dists.getLonguestDistance.apply(this, args);
  return this;
};

function _to(to) {
  if (!to) return this;
  this._coordinates.to = to;

  if (!this._coordinates.from) return this;

  const args = [];
  args.push.apply(args, this._coordinates.from);
  args.push.apply(args, to);
  this._distance = dists.getLonguestDistance.apply(this, args);
  return this;
};

export function simpleETA(from, to) {
  const eta = {
    _coordinates: {
      from: null,
      to: null,
      waypoints: []
    }
  };

  eta.get = _get.bind(eta);
  eta.from = _from.bind(eta);
  eta.to = _to.bind(eta);

  eta.from(from);
  eta.to(to);

  return eta;
};

