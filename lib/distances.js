'use strict';

// http://stackoverflow.com/a/365853

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toRad = toRad;
exports.getShortestDistance = getShortestDistance;
exports.getLonguestDistance = getLonguestDistance;
exports.getLonguestDistanceFromCoordinates = getLonguestDistanceFromCoordinates;
exports.getAverageETA = getAverageETA;
function toRad(deg) {
  return deg * (Math.PI / 180);
}

function getShortestDistance(lat1, lon1, lat2, lon2) {
  var R = 6371000; // m
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var rLat1 = toRad(lat1);
  var rLat2 = toRad(lat2);

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(rLat1) * Math.cos(rLat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

function getLonguestDistance(lat1, lon1, lat2, lon2) {
  // Just the sum of two special cases of getShortestDistance
  var R = 6371000; // m

  var dLon = toRad(lon2 - lon1);
  var dLat = toRad(lat2 - lat1);
  var rLat1 = toRad(lat1);
  var rLat2 = toRad(lat1);

  var a = Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(rLat1) * Math.cos(rLat2);
  var distA = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var b = Math.sin(dLat / 2) * Math.sin(dLat / 2);
  var distB = R * 2 * Math.atan2(Math.sqrt(b), Math.sqrt(1 - b));

  return distA + distB;
}

function getLonguestDistanceFromCoordinates(from, to, waypoints) {
  var points = [];
  points.push(from);
  points.push.apply(points, waypoints);
  points.push(to);

  var distance = 0;
  points.forEach(function (point, i) {
    if (!i) return;
    distance += getLonguestDistance(points[i - 1][0], points[i - 1][1], point[0], point[1]);
  });
  return distance;
}

function getAverageETA(distance, speed) {
  return Math.round(distance / speed);
}