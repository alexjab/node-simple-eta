'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.simpleETA = simpleETA;

var _distances = require('./distances.js');

var dists = _interopRequireWildcard(_distances);

var _speed = require('./speed.js');

var speed = _interopRequireWildcard(_speed);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _get(modeOfTransport) {
  if (!modeOfTransport) {
    modeOfTransport = speed.inferModeOfTransportFromDistance(this._distance);
  }

  var averageSpeed = speed.getAverageSpeed(this._distance, modeOfTransport);

  var duration = dists.getAverageETA(this._distance, averageSpeed);

  return {
    distance: Math.round(this._distance),
    duration: duration,
    mode: modeOfTransport
  };
};

function _from(latitude, longitude) {
  if (!latitude) return this;

  var from = undefined;
  if (typeof latitude === 'number') {
    from = [latitude, longitude];
  } else {
    from = latitude;
  }
  this._coordinates.from = from;

  if (!this._coordinates.to) return this;

  var args = [];
  args.push.apply(args, from);
  args.push.apply(args, this._coordinates.to);
  this._distance = dists.getLonguestDistance.apply(this, args);
  return this;
};

function _to(latitude, longitude) {
  if (!latitude) return this;

  var to = undefined;
  if (typeof latitude === 'number') {
    to = [latitude, longitude];
  } else {
    to = latitude;
  }
  this._coordinates.to = to;

  if (!this._coordinates.from) return this;

  var args = [];
  args.push.apply(args, this._coordinates.from);
  args.push.apply(args, to);
  this._distance = dists.getLonguestDistance.apply(this, args);
  return this;
};

function simpleETA(from, to) {
  var eta = {
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