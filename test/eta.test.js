'use strict';

const should = require('should');
const simpleETA = require('../src/eta.js');

describe('eta.js', function() {
  it('should get an eta with the expected fields', function() {
    const inputs = [ [Math.random()*100, Math.random()*10], [Math.random()*100, Math.random()*10] ];
    const eta = simpleETA.apply(this, inputs).get();
    eta.should.have.property('distance');
    eta.should.have.property('duration');
    eta.should.have.property('mode');
  });

  it('should get an eta (no mode of transportation provided)', function() {
    const eta = simpleETA([48.856578, 2.351828], [45.759723, 4.842223]).get();
    eta.mode.should.equal('driving');
  });

  it('should get an eta (no mode of transportation provided)', function() {
    const eta = simpleETA([48.835292, 2.286375], [48.836386, 2.281820]).get();
    eta.mode.should.equal('walking');
  });
});
