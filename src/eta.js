'use strict';

import * as dists from './distances.js';
import * as speed from './speed.js';
import * as schema from './eta.schema.js';

class SimpleETA {
  constructor(from, to) {
    schema.validateConstructor(from, to);

    this.coordinates = {
      from: null,
      to: null,
      waypoints: []
    };

    if (from) this.from(from);
    if (to) this.to(to);
  }

  get(modeOfTransport) {
    if (!modeOfTransport) {
      modeOfTransport = speed.inferModeOfTransportFromDistance(this.distance);
    }

    const averageSpeed = speed.getAverageSpeed(this.distance, modeOfTransport);

    const distance = Math.round(this.distance);
    const duration = dists.getAverageETA(this.distance, averageSpeed);
    const mode = modeOfTransport;

    return {
      distance,
      duration,
      mode
    };
  }

  from(latitude, longitude) {
    const _from = schema.validateCoordinates(latitude, longitude);
    this.coordinates.from = _from;

    if (!this.coordinates.to) return this;

    this.distance = dists.getLonguestDistanceFromCoordinates(
      _from,
      this.coordinates.to,
      this.coordinates.waypoints);
    return this;
  }

  to(latitude, longitude) {
    if (!latitude) return this;

    const _to = schema.validateCoordinates(latitude, longitude);
    this.coordinates.to = _to;

    if (!this.coordinates.from) return this;

    this.distance = dists.getLonguestDistanceFromCoordinates(
      this.coordinates.from,
      _to,
      this.coordinates.waypoints);
    return this;
  }

  waypoint(latitude, longitude) {
    if (!latitude) return this;

    const _waypoint = schema.validateCoordinates(latitude, longitude);
    this.coordinates.waypoints.push(_waypoint);

    if (!this.coordinates.from || !this.coordinates.to) return this;

    this._distance = dists.getLonguestDistanceFromCoordinates(
      this.coordinates.from,
      this.coordinates.to,
      this.coordinates.waypoints);
    return this;
  }
}

export default function simpleETA(from, to) {
  return new SimpleETA(from, to);
}
