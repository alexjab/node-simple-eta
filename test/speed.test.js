'use strict';

const should = require('should');
const speed = require('../lib/speed.js');

const MODES = [ 'DRIVING', 'WALKING' ];
const DISTANCES = [ 'SHORT', 'MEDIUM', 'LONG' ];

describe('speed.js', function() {
  describe('#MODE_SPEEDS', function() {
    it ('should have the speeds associated with several modes of transportation', function() {
      speed.should.have.property('MODE_SPEEDS');
      speed.MODE_SPEEDS.should.be.instanceof(Object);
    });

    MODES.forEach((mode) => {
      it ('should have the speeds associated with ' + mode.toLowerCase(), function() {
        speed.MODE_SPEEDS.should.have.property(mode);
        DISTANCES.forEach((distance) => {
          speed.MODE_SPEEDS.DRIVING.should.have.property(distance);
        });
      });
    });
  });

  describe('#inferModeOfTransportFromDistance()', () => {
    it('should infer the mode of transport based on the distance', () => {
      const inputs = [1400, 1999, 2000, 2001, 2520];
      const expected = [ 'walking', 'walking', 'driving', 'driving', 'driving' ];
      inputs.forEach((distance, i) => {
        speed.inferModeOfTransportFromDistance(distance).should.equal(expected[i]);
      });
    });
  });

  describe('#getAverageSpeed()', () => {
    it('should return the average speed based on the distance and the mode of transportation', () => {
      const distanceInputs = [700, 9520, 25000];
      const modeInputs = MODES;
      const expected = [
        [ 30, 50, 90 ],
        [ 4, 4, 4 ],
      ];

      modeInputs.forEach((mode, i) => {
        distanceInputs.forEach((distance, j) => {
          speed.getAverageSpeed(distance, mode).should.equal(expected[i][j] * 1000 / 3600);
        });
      });
    });
  });
});
