import {
  _get,
  _from,
  _to,
  _waypoint
} from './eta.js';

export default function simpleETA(from, to) {
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
  eta.waypoint = _waypoint.bind(eta);

  eta.from(from);
  eta.to(to);

  return eta;
}
