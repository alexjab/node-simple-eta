'use strict';

const should = require('should');
const simpleETA = require('../index.js');

describe('eta.js', () => {

  describe('simpleETA()', () => {
    it('should set the `from` and `to` parameter of the eta (implicit ETA intialization)', () => {
      const from = [ Math.random() * 100, Math.random() * 10 ];
      const to = [ Math.random() * 100, Math.random() * 10 ];
      const eta = simpleETA(from, to);
      should.exist(eta.coordinates.from);
      should.exist(eta.coordinates.to);
      eta.coordinates.from.should.eql(from);
      eta.coordinates.to.should.eql(to);
      eta.should.have.property('distance');
      eta.distance.should.not.be.NaN();
    });

    it('should set the `from` parameter of the eta (semi-implicit ETA intialization)', () => {
      const from = [ Math.random() * 100, Math.random() * 10 ];
      const eta = simpleETA(from);
      should.exist(eta.coordinates.from);
      should.not.exist(eta.coordinates.to);
      eta.coordinates.from.should.eql(from);
      eta.should.not.have.property('distance');
    });

    it('should not set the `from` nor the `to` parameter of the eta (empty ETA intialization)', () => {
      const eta = simpleETA();
      should.not.exist(eta.coordinates.from);
      should.not.exist(eta.coordinates.to);
      eta.should.not.have.property('distance');
    });

    it('should allow chainable methods when calling `from`', () => {
      const eta = simpleETA();
      eta.from([ Math.random() * 100, Math.random() * 10 ])
        .should.eql(eta);
    });

    it('should allow chainable methods when calling `to`', () => {
      const eta = simpleETA();
      eta.to([ Math.random() * 100, Math.random() * 10 ])
        .should.equal(eta);
    });

    it('should allow chainable methods when calling `waypoint`', () => {
      const eta = simpleETA();
      eta.waypoint([ Math.random() * 100, Math.random() * 10 ])
        .waypoint([ Math.random() * 100, Math.random() * 10 ])
        .should.equal(eta);
    });
  });

  describe('#from()', () => {

    it('should update the `from` and `to` parameter of the eta (implicit ETA intialization)', () => {
      const from1 = [ Math.random() * 100, Math.random() * 10 ];
      const to = [ Math.random() * 100, Math.random() * 10 ];
      const from2 = [ Math.random() * 100, Math.random() * 10 ];

      const eta = simpleETA(from1, to);
      const distance1 = eta.distance;
      eta.from(from2);

      eta.coordinates.from.should.eql(from2);
      eta.coordinates.from.should.not.eql(from1);
      eta.should.have.property('distance');
      eta.distance.should.not.be.NaN();
      eta.distance.should.not.equal(distance1);
    });

    it('should update the `from` parameter of the eta (semi-implicit ETA intialization)', () => {
      const from1 = [ Math.random() * 100, Math.random() * 10 ];
      const from2 = [ Math.random() * 100, Math.random() * 10 ];

      const eta = simpleETA(from1);
      eta.from(from2);

      eta.coordinates.from.should.eql(from2);
      eta.coordinates.from.should.not.eql(from1);
      should.not.exist(eta.coordinates.to);
      eta.should.not.have.property('distance');
    });

    it('should set the `from` parameter of the eta (empty ETA intialization, array of coordinates)', () => {
      const from = [ Math.random() * 100, Math.random() * 10 ];

      const eta = simpleETA();
      eta.from(from);

      eta.coordinates.from.should.eql(from);
      should.not.exist(eta.coordinates.to);
      eta.should.not.have.property('distance');
    });

    it('should set the `from` parameter of the eta (empty ETA intialization, latitude and longitude)', () => {
      const lat = Math.random() * 100;
      const lon = Math.random() * 10;

      const eta1 = simpleETA();
      eta1.from(lat, lon);

      should.not.exist(eta1.coordinates.to);
      eta1.coordinates.should.have.property('from');
      eta1.coordinates.from.should.eql([ lat, lon ]);

      const eta2 = simpleETA();
      eta2.from([ lat, lon ]);

      eta2.coordinates.should.have.property('from');
      eta2.coordinates.from.should.eql([ lat, lon ]);
    });

    it('should throw an error (invalid parameters)', () => {
      let error;
      try {
        simpleETA().from([[ Math.random() * 100, Math.random()*10 ]]);
      } catch(e) {
        error = e;
      }

      error.should.be.Error();
      error.message.should.match(/array.*number.*length.*2/);

      try {
        simpleETA().from([ null, Math.random()*10 ]);
      } catch(e) {
        error = e;
      }

      error.should.be.Error();
      error.message.should.match(/array.*number.*length.*2/);

      try {
        simpleETA().from(null, Math.random()*10);
      } catch(e) {
        error = e;
      }

      error.should.be.Error();
      error.message.should.match(/2.*number.*parameter/);
    });
  });

  describe('#to()', () => {

    it('should update the `to` parameter of the eta (implicit ETA intialization)', () => {
      const from = [ Math.random() * 100, Math.random() * 10 ];
      const to1 = [ Math.random() * 100, Math.random() * 10 ];
      const to2 = [ Math.random() * 100, Math.random() * 10 ];

      const eta = simpleETA(from, to1);
      const distance1 = eta.distance;
      eta.to(to2);

      eta.coordinates.to.should.eql(to2);
      eta.coordinates.to.should.not.eql(to1);
      eta.should.have.property('distance');
      eta.distance.should.not.be.NaN();
      eta.distance.should.not.equal(distance1);
    });

    it('should set the `to` parameter of the eta (empty ETA intialization)', () => {
      const to = [ Math.random() * 100, Math.random() * 10 ];

      const eta = simpleETA();
      eta.to(to);

      eta.coordinates.to.should.eql(to);
      should.not.exist(eta.coordinates.from);
      eta.should.not.have.property('distance');
    });

    it('should set the `to` parameter of the eta (empty ETA intialization, latitude and longitude)', () => {
      const lat = Math.random() * 100;
      const lon = Math.random() * 10;

      const eta1 = simpleETA();
      eta1.to(lat, lon);

      should.not.exist(eta1.coordinates.from);
      eta1.coordinates.should.have.property('to');
      eta1.coordinates.to.should.eql([ lat, lon ]);

      const eta2 = simpleETA();
      eta2.to([ lat, lon ]);

      eta2.coordinates.should.have.property('to');
      eta2.coordinates.to.should.eql([ lat, lon ]);
    });
  });

  describe('#waypoint()', () => {
    it('should push a set of coordinates to the `waypoint` parameter of the eta (array of latitude and longitude)', () => {
      const waypoint = [ Math.random() * 100, Math.random() * 10 ];

      const eta = simpleETA();
      eta.waypoint(waypoint);

      should.not.exist(eta.coordinates.to);
      should.not.exist(eta.coordinates.from);
      eta.should.not.have.property('distance');
      eta.coordinates.waypoints.length.should.equal(1);
      eta.coordinates.waypoints[0].should.eql(waypoint);
    });

    it('should push a set of coordinates to the `waypoint` parameter of the eta (latitude and longitude)', () => {
      const lat = Math.random() * 100;
      const lon = Math.random() * 10;

      const eta1 = simpleETA();
      eta1.waypoint(lat, lon);

      should.not.exist(eta1.coordinates.to);
      should.not.exist(eta1.coordinates.from);
      eta1.coordinates.waypoints.length.should.equal(1);
      eta1.coordinates.waypoints[0].should.eql([ lat, lon ]);

      const eta2 = simpleETA();
      eta2.waypoint([ lat, lon ]);

      eta2.coordinates.waypoints.length.should.equal(1);
      eta2.coordinates.waypoints[0].should.eql([ lat, lon ]);
    });
  });

  describe('#get()', () => {
    it('should get an eta with the expected fields', () => {
      const inputs = [ [Math.random()*100, Math.random()*10], [Math.random()*100, Math.random()*10] ];
      const eta = simpleETA.apply(this, inputs).get();
      eta.should.have.property('distance');
      eta.should.have.property('duration');
      eta.should.have.property('mode');
    });

    it('should get an eta (driving, no mode of transportation provided)', () => {
      const eta = simpleETA([48.856578, 2.351828], [45.759723, 4.842223]).get();
      eta.mode.should.equal('driving');
      eta.distance.should.not.be.NaN();
      eta.duration.should.not.be.NaN();
    });

    it('should get an eta (walking, no mode of transportation provided)', () => {
      const eta = simpleETA([48.835292, 2.286375], [48.836386, 2.281820]).get();
      eta.mode.should.equal('walking');
      eta.distance.should.not.be.NaN();
      eta.duration.should.not.be.NaN();
    });

    it('should get an eta (mode of transportation provided)', () => {
      const positionInputs = [
        [ [48.856578, 2.351828], [45.759723, 4.842223] ],
        [ [48.835292, 2.286375], [48.836386, 2.281820] ]
      ];
      const modeInputs = [ 'driving', 'walking' ];

      positionInputs.forEach((positions) => {
        modeInputs.forEach((mode) => {
          const eta = simpleETA(positions[0], positions[1]).get(mode);
          eta.mode.should.equal(mode);
          eta.distance.should.not.be.NaN();
          eta.duration.should.not.be.NaN();
        });
      });
    });
  });
});
