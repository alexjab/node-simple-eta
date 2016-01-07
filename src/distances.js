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
  // Just the sum of two special cases of getShortestDistance
  const R = 6371000; // m

  const dLon = toRad(lon2 - lon1);
  const dLat = toRad(lat2 - lat1);
  const rLat1 = toRad(lat1);
  const rLat2 = toRad(lat1);

  const a = Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(rLat1) * Math.cos(rLat2);
  const distA = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const b = Math.sin(dLat / 2) * Math.sin(dLat / 2);
  const distB = R * 2 * Math.atan2(Math.sqrt(b), Math.sqrt(1 - b));

  return distA + distB;
}

export function getLonguestDistanceFromCoordinates(from, to, waypoints) {
  const points = [];
  points.push(from);
  points.push.apply(points, waypoints);
  points.push(to);

  let distance = 0;
  points.forEach((point, i) => {
    if (!i) return;
    distance += getLonguestDistance(points[i - 1][0],
      points[i - 1][1],
      point[0],
      point[1]);
  });
  return distance;
}

export function getAverageETA(distance, speed) {
  return Math.round(distance / speed);
}
