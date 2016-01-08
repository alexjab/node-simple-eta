'use strict';

import * as dists from './distances.js';
import * as speed from './speed.js';

export function _get(modeOfTransport) {
  if (!modeOfTransport) {
    modeOfTransport = speed.inferModeOfTransportFromDistance(this._distance);
  }

  const averageSpeed = speed.getAverageSpeed(this._distance, modeOfTransport);

  const distance = Math.round(this._distance);
  const duration = dists.getAverageETA(this._distance, averageSpeed);
  const mode = modeOfTransport;

  return {
    distance,
    duration,
    mode
  };
}

export function _from(latitude, longitude) {
  if (!latitude) return this;

  let from;
  if (typeof latitude === 'number') {
    from = [ latitude, longitude ];
  } else {
    from = latitude;
  }
  this._coordinates.from = from;

  if (!this._coordinates.to) return this;

  this._distance = dists.getLonguestDistanceFromCoordinates(
      from,
      this._coordinates.to,
      this._coordinates.waypoints);
  return this;
}

export function _to(latitude, longitude) {
  if (!latitude) return this;

  let to;
  if (typeof latitude === 'number') {
    to = [ latitude, longitude ];
  } else {
    to = latitude;
  }
  this._coordinates.to = to;

  if (!this._coordinates.from) return this;

  this._distance = dists.getLonguestDistanceFromCoordinates(
      this._coordinates.from,
      to,
      this._coordinates.waypoints);
  return this;
}

export function _waypoint(latitude, longitude) {
  if (!latitude) return this;

  let waypoint = latitude;
  if (typeof latitude === 'number') {
    waypoint = [ latitude, longitude ];
  }
  this._coordinates.waypoints.push(waypoint);

  if (!this._coordinates.from || !this._coordinates.to) return this;

  this._distance = dists.getLonguestDistanceFromCoordinates(
      this._coordinates.from,
      this._coordinates.to,
      this._coordinates.waypoints);
  return this;
}
