'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = simpleETA;

var _distances = require('./distances.js');

var dists = _interopRequireWildcard(_distances);

var _speed = require('./speed.js');

var speed = _interopRequireWildcard(_speed);

var _etaSchema = require('./eta.schema.js');

var schema = _interopRequireWildcard(_etaSchema);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SimpleETA = (function () {
  function SimpleETA(from, to) {
    _classCallCheck(this, SimpleETA);

    schema.validateConstructor(from, to);

    this.coordinates = {
      from: null,
      to: null,
      waypoints: []
    };

    if (from) this.from(from);
    if (to) this.to(to);
  }

  _createClass(SimpleETA, [{
    key: 'get',
    value: function get(modeOfTransport) {
      if (!modeOfTransport) {
        modeOfTransport = speed.inferModeOfTransportFromDistance(this.distance);
      }

      var averageSpeed = speed.getAverageSpeed(this.distance, modeOfTransport);

      var distance = Math.round(this.distance);
      var duration = dists.getAverageETA(this.distance, averageSpeed);
      var mode = modeOfTransport;

      return {
        distance: distance,
        duration: duration,
        mode: mode
      };
    }
  }, {
    key: 'from',
    value: function from(latitude, longitude) {
      var _from = schema.validateCoordinates(latitude, longitude);
      this.coordinates.from = _from;

      if (!this.coordinates.to) return this;

      this.distance = dists.getLonguestDistanceFromCoordinates(_from, this.coordinates.to, this.coordinates.waypoints);
      return this;
    }
  }, {
    key: 'to',
    value: function to(latitude, longitude) {
      if (!latitude) return this;

      var _to = schema.validateCoordinates(latitude, longitude);
      this.coordinates.to = _to;

      if (!this.coordinates.from) return this;

      this.distance = dists.getLonguestDistanceFromCoordinates(this.coordinates.from, _to, this.coordinates.waypoints);
      return this;
    }
  }, {
    key: 'waypoint',
    value: function waypoint(latitude, longitude) {
      if (!latitude) return this;

      var _waypoint = schema.validateCoordinates(latitude, longitude);
      this.coordinates.waypoints.push(_waypoint);

      if (!this.coordinates.from || !this.coordinates.to) return this;

      this._distance = dists.getLonguestDistanceFromCoordinates(this.coordinates.from, this.coordinates.to, this.coordinates.waypoints);
      return this;
    }
  }]);

  return SimpleETA;
})();

function simpleETA(from, to) {
  return new SimpleETA(from, to);
}