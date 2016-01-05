'use strict';

var _distances = require('./distances.js');

var _distances2 = _interopRequireDefault(_distances);

var _speed = require('./speed.js');

var _speed2 = _interopRequireDefault(_speed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _get(modeOfTransport) {
  if (!modeOfTransport) {
    modeOfTransport = _speed2.default.inferModeOfTransportFromDistance(this._distance);
  }

  var averageSpeed = _speed2.default.getAverageSpeed(this._distance, modeOfTransport);

  var duration = _distances2.default.getAverageETA(this._distance, averageSpeed);

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

  var args = [];
  args.push.apply(args, from);
  args.push.apply(args, this._coordinates.to);
  this._distance = _distances2.default.getLonguestDistance.apply(this, args);
  return this;
};

function _to(to) {
  if (!to) return this;
  this._coordinates.to = to;

  if (!this._coordinates.from) return this;

  var args = [];
  args.push.apply(args, this._coordinates.from);
  args.push.apply(args, to);
  this._distance = _distances2.default.getLonguestDistance.apply(this, args);
  return this;
};

function simpleEta(from, to) {
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

module.exports = simpleEta;