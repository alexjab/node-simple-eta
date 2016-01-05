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
    const inputs = [
      [48.835527, 2.286271, 48.889798, 2.301743],
      [48.835527, 2.286271, 48.876856, 2.325345],
      [61.418407, 23.616828, 61.448778, 23.854064],
      [60.170041, 24.940553, 66.494505, 25.724362]
    ];
    it('should return the longuest distance from two points', function() {
      inputs.forEach((input, i) => {
        const latDiff = dists.getShortestDistance(input[0], input[1], input[0], input[3]);
        const lonDiff = dists.getShortestDistance(input[0], input[3], input[2], input[3]);

        dists.getLonguestDistance.apply(this, input).should.equal(latDiff + lonDiff);
      });
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
