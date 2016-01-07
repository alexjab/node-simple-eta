'use strict';

const should = require('should');
const dists = require('../lib/distances.js');

describe('distances.js', function() {
  describe('#toRad()', function() {
    let angle = 0;
    it('should return radians from degrees ', function() {
      for(let i = 0; i < 360; i++) {
        dists.toRad(angle + i).should.equal((angle + i) * (Math.PI / 180));
      }
    });
  });

  describe('#getShortestDistance()', function() {
    const inputs = [
      [48.835527, 2.286271, 48.889798, 2.301743],
      [48.835527, 2.286271, 48.876856, 2.325345],
      [61.418407, 23.616828, 61.448778, 23.854064],
      [60.170041, 24.940553, 66.494505, 25.724362]
    ];
    const expected = [ 
      6000,
      5000,
      13000,
      700000
    ];
    it('should return the shortest distance from two points', function() {
      inputs.forEach((input, i) => {
        dists.getShortestDistance.apply(this, input).should.be.approximately(expected[i], 0.10 * expected[i]);
      });
    })
  });

  describe('#getLonguestDistance()', function() {
    it('should return the longuest distance from two points', function() {
      const input = [ Math.random() * 100, Math.random()*10, Math.random() * 100, Math.random()*10 ];
      const latDiff = dists.getShortestDistance(input[0], input[1], input[0], input[3]);
      const lonDiff = dists.getShortestDistance(input[0], input[3], input[2], input[3]);

      dists.getLonguestDistance.apply(this, input).should.equal(latDiff + lonDiff);
    });
  });

  describe('#getLonguestDistanceFromCoordinates()', function() {
    it('should return the Manhattan distance between all the points of an array (`from` and `to`)', function() {
      const from = [ Math.random() * 100, Math.random()*10 ];
      const to = [ Math.random() * 100, Math.random()*10 ];
      const latDiff = dists.getShortestDistance(from[0], from[1], from[0], to[1]);
      const lonDiff = dists.getShortestDistance(from[0], to[1], to[0], to[1]);

      dists.getLonguestDistanceFromCoordinates(from, to).should.equal(latDiff + lonDiff);
    });

    it('should return the Manhattan distance between all the points of an array (`from`,`to` and `waypoints`)', function() {
      const from = [ Math.random() * 100, Math.random()*10 ];
      const to = [ Math.random() * 100, Math.random()*10 ];
      const w1 = [ Math.random() * 100, Math.random()*10 ];
      let latDiff = 0;
      let lonDiff = 0;
      latDiff += dists.getShortestDistance(from[0], from[1], from[0], w1[1]);
      lonDiff += dists.getShortestDistance(from[0], w1[1], w1[0], w1[1]);
      latDiff += dists.getShortestDistance(w1[0], w1[1], w1[0], to[1]);
      lonDiff += dists.getShortestDistance(w1[0], to[1], to[0], to[1]);

      dists.getLonguestDistanceFromCoordinates(from, to, [w1]).should.be.approximately(latDiff + lonDiff, 1E-5);
    });
  });

  describe('#getAverageETA()', function() {
    it('should return the average ETA for a distance and speed', function() {
      const distance = Math.random() * 1000;
      const speed = Math.random() * 1000;
      dists.getAverageETA(distance, speed).should.equal(Math.round(distance / speed));
    });
  });
});
