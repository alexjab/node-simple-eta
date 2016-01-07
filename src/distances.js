'use strict';

// http://stackoverflow.com/a/365853
export function toRad(deg) {
  return deg * (Math.PI / 180);
}

export function getShortestDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // m
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const rLat1 = toRad(lat1);
  const rLat2 = toRad(lat2);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(rLat1) * Math.cos(rLat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

export function getLonguestDistance(lat1, lon1, lat2, lon2) {
  return getShortestDistance(lat1, lon1, lat1, lon2) + getShortestDistance(lat1, lon2, lat2, lon2);
}

export function getAverageETA(distance, speed) {
  return Math.round(distance / speed);
}
