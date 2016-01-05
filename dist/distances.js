'use strict';

// http://stackoverflow.com/a/365853

function toRad(deg) {
  return deg * (Math.PI / 180);
}
module.exports.toRad = toRad;

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
module.exports.getShortestDistance = getShortestDistance;

function getLonguestDistance(lat1, lon1, lat2, lon2) {
  return getShortestDistance(lat1, lon1, lat1, lon2) + getShortestDistance(lat1, lon2, lat2, lon2);
}
module.exports.getLonguestDistance = getLonguestDistance;

function getAverageETA(distance, speed) {
  return Math.round(distance / speed);
}
module.exports.getAverageETA = getAverageETA;