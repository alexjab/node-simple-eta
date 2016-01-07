'use strict';

const should = require('should');
const simpleETA = require('../index.js');

describe('eta.js', () => {

  describe('simpleETA()', () => {
    it('should set the `from` and `to` parameter of the eta (implicit ETA intialization)', () => {
      const from = [ Math.random() * 100, Math.random() * 10 ];
      const to = [ Math.random() * 100, Math.random() * 10 ];
      const eta = simpleETA(from, to);
      should.exist(eta._coordinates.from);
      should.exist(eta._coordinates.to);
      eta._coordinates.from.should.eql(from);
      eta._coordinates.to.should.eql(to);
      eta.should.have.property('_distance');
      eta._distance.should.not.be.NaN();
    });

    it('should set the `from` parameter of the eta (semi-implicit ETA intialization)', () => {
      const from = [ Math.random() * 100, Math.random() * 10 ];
      const eta = simpleETA(from);
      should.exist(eta._coordinates.from);
      should.not.exist(eta._coordinates.to);
      eta._coordinates.from.should.eql(from);
      eta.should.not.have.property('_distance');
    });

    it('should not set the `from` nor the `to` parameter of the eta (empty ETA intialization)', () => {
      const eta = simpleETA();
      should.not.exist(eta._coordinates.from);
      should.not.exist(eta._coordinates.to);
      eta.should.not.have.property('_distance');
    });

    it('should allow chainable methods when calling only `from`', () => {
      const eta = simpleETA()
        .from([ Math.random() * 100, Math.random() * 10 ])
        .get();
      should.exist(eta);
    });

    it('should allow chainable methods when calling only `to`', () => {
      const eta = simpleETA()
        .to([ Math.random() * 100, Math.random() * 10 ])
        .get();
      should.exist(eta);
    });

    it('should allow chainable methods when calling both `from` and `to`', () => {
      const eta = simpleETA()
        .from([ Math.random() * 100, Math.random() * 10 ])
        .to([ Math.random() * 100, Math.random() * 10 ])
        .from([ Math.random() * 100, Math.random() * 10 ])
        .get();
      should.exist(eta);
    });
  });

  describe('#from()', () => {

    it('should update the `from` and `to` parameter of the eta (implicit ETA intialization)', () => {
      const from1 = [ Math.random() * 100, Math.random() * 10 ];
      const to = [ Math.random() * 100, Math.random() * 10 ];
      const from2 = [ Math.random() * 100, Math.random() * 10 ];

      const eta = simpleETA(from1, to);
      const distance1 = eta._distance;
      eta.from(from2);

      eta._coordinates.from.should.eql(from2);
      eta._coordinates.from.should.not.eql(from1);
      eta.should.have.property('_distance');
      eta._distance.should.not.be.NaN();
      eta._distance.should.not.equal(distance1);
    });

    it('should update the `from` parameter of the eta (semi-implicit ETA intialization)', () => {
      const from1 = [ Math.random() * 100, Math.random() * 10 ];
      const from2 = [ Math.random() * 100, Math.random() * 10 ];

      const eta = simpleETA(from1);
      eta.from(from2);

      eta._coordinates.from.should.eql(from2);
      eta._coordinates.from.should.not.eql(from1);
      should.not.exist(eta._coordinates.to);
      eta.should.not.have.property('_distance');
    });

    it('should set the `from` parameter of the eta (empty ETA intialization, array of coordinates)', () => {
      const from = [ Math.random() * 100, Math.random() * 10 ];

      const eta = simpleETA();
      eta.from(from);

      eta._coordinates.from.should.eql(from);
      should.not.exist(eta._coordinates.to);
      eta.should.not.have.property('_distance');
    });

    it('should set the `from` parameter of the eta (empty ETA intialization, latitude and longitude)', () => {
      const lat = Math.random() * 100;
      const lon = Math.random() * 10;

      const eta1 = simpleETA();
      eta1.from(lat, lon);

      should.not.exist(eta1._coordinates.to);
      eta1._coordinates.should.have.property('from');
      eta1._coordinates.from.should.eql([ lat, lon ]);

      const eta2 = simpleETA();
      eta2.from([ lat, lon ]);

      eta2._coordinates.should.have.property('from');
      eta2._coordinates.from.should.eql([ lat, lon ]);
    });
  });

  describe('#to()', () => {

    it('should update the `to` parameter of the eta (implicit ETA intialization)', () => {
      const from = [ Math.random() * 100, Math.random() * 10 ];
      const to1 = [ Math.random() * 100, Math.random() * 10 ];
      const to2 = [ Math.random() * 100, Math.random() * 10 ];

      const eta = simpleETA(from, to1);
      const distance1 = eta._distance;
      eta.to(to2);

      eta._coordinates.to.should.eql(to2);
      eta._coordinates.to.should.not.eql(to1);
      eta.should.have.property('_distance');
      eta._distance.should.not.be.NaN();
      eta._distance.should.not.equal(distance1);
    });

    it('should set the `to` parameter of the eta (empty ETA intialization)', () => {
      const to = [ Math.random() * 100, Math.random() * 10 ];

      const eta = simpleETA();
      eta.to(to);

      eta._coordinates.to.should.eql(to);
      should.not.exist(eta._coordinates.from);
      eta.should.not.have.property('_distance');
    });

    it('should set the `to` parameter of the eta (empty ETA intialization, latitude and longitude)', () => {
      const lat = Math.random() * 100;
      const lon = Math.random() * 10;

      const eta1 = simpleETA();
      eta1.to(lat, lon);

      should.not.exist(eta1._coordinates.from);
      eta1._coordinates.should.have.property('to');
      eta1._coordinates.to.should.eql([ lat, lon ]);

      const eta2 = simpleETA();
      eta2.to([ lat, lon ]);

      eta2._coordinates.should.have.property('to');
      eta2._coordinates.to.should.eql([ lat, lon ]);
    });
  });

  describe('#waypoint()', () => {
    it('should push a set of coordinates to the `waypoint` parameter of the eta (array of latitude and longitude)', () => {
      const waypoint = [ Math.random() * 100, Math.random() * 10 ];

      const eta = simpleETA();
      eta.waypoint(waypoint);

      should.not.exist(eta._coordinates.to);
      should.not.exist(eta._coordinates.from);
      eta.should.not.have.property('_distance');
      eta._coordinates.waypoints.length.should.equal(1);
      eta._coordinates.waypoints[0].should.eql(waypoint);
    });

    it('should push a set of coordinates to the `waypoint` parameter of the eta (latitude and longitude)', () => {
      const lat = Math.random() * 100;
      const lon = Math.random() * 10;

      const eta1 = simpleETA();
      eta1.waypoint(lat, lon);

      should.not.exist(eta1._coordinates.to);
      should.not.exist(eta1._coordinates.from);
      eta1._coordinates.waypoints.length.should.equal(1);
      eta1._coordinates.waypoints[0].should.eql([ lat, lon ]);

      const eta2 = simpleETA();
      eta2.waypoint([ lat, lon ]);

      eta2._coordinates.waypoints.length.should.equal(1);
      eta2._coordinates.waypoints[0].should.eql([ lat, lon ]);
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
