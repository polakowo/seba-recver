'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Tip = mongoose.model('Tip'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, tip;

/**
 * Tip routes tests
 */
describe('Tip CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Tip
    user.save(function () {
      tip = {
        name: 'Tip name'
      };

      done();
    });
  });

  it('should be able to save a Tip if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Tip
        agent.post('/api/tips')
          .send(tip)
          .expect(200)
          .end(function (tipSaveErr, tipSaveRes) {
            // Handle Tip save error
            if (tipSaveErr) {
              return done(tipSaveErr);
            }

            // Get a list of Tips
            agent.get('/api/tips')
              .end(function (tipsGetErr, tipsGetRes) {
                // Handle Tip save error
                if (tipsGetErr) {
                  return done(tipsGetErr);
                }

                // Get Tips list
                var tips = tipsGetRes.body;

                // Set assertions
                (tips[0].user._id).should.equal(userId);
                (tips[0].name).should.match('Tip name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Tip if not logged in', function (done) {
    agent.post('/api/tips')
      .send(tip)
      .expect(403)
      .end(function (tipSaveErr, tipSaveRes) {
        // Call the assertion callback
        done(tipSaveErr);
      });
  });

  it('should not be able to save an Tip if no name is provided', function (done) {
    // Invalidate name field
    tip.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Tip
        agent.post('/api/tips')
          .send(tip)
          .expect(400)
          .end(function (tipSaveErr, tipSaveRes) {
            // Set message assertion
            (tipSaveRes.body.message).should.match('Please fill Tip name');

            // Handle Tip save error
            done(tipSaveErr);
          });
      });
  });

  it('should be able to update an Tip if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Tip
        agent.post('/api/tips')
          .send(tip)
          .expect(200)
          .end(function (tipSaveErr, tipSaveRes) {
            // Handle Tip save error
            if (tipSaveErr) {
              return done(tipSaveErr);
            }

            // Update Tip name
            tip.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Tip
            agent.put('/api/tips/' + tipSaveRes.body._id)
              .send(tip)
              .expect(200)
              .end(function (tipUpdateErr, tipUpdateRes) {
                // Handle Tip update error
                if (tipUpdateErr) {
                  return done(tipUpdateErr);
                }

                // Set assertions
                (tipUpdateRes.body._id).should.equal(tipSaveRes.body._id);
                (tipUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Tips if not signed in', function (done) {
    // Create new Tip model instance
    var tipObj = new Tip(tip);

    // Save the tip
    tipObj.save(function () {
      // Request Tips
      request(app).get('/api/tips')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Tip if not signed in', function (done) {
    // Create new Tip model instance
    var tipObj = new Tip(tip);

    // Save the Tip
    tipObj.save(function () {
      request(app).get('/api/tips/' + tipObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', tip.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Tip with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/tips/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Tip is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Tip which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Tip
    request(app).get('/api/tips/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Tip with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Tip if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Tip
        agent.post('/api/tips')
          .send(tip)
          .expect(200)
          .end(function (tipSaveErr, tipSaveRes) {
            // Handle Tip save error
            if (tipSaveErr) {
              return done(tipSaveErr);
            }

            // Delete an existing Tip
            agent.delete('/api/tips/' + tipSaveRes.body._id)
              .send(tip)
              .expect(200)
              .end(function (tipDeleteErr, tipDeleteRes) {
                // Handle tip error error
                if (tipDeleteErr) {
                  return done(tipDeleteErr);
                }

                // Set assertions
                (tipDeleteRes.body._id).should.equal(tipSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Tip if not signed in', function (done) {
    // Set Tip user
    tip.user = user;

    // Create new Tip model instance
    var tipObj = new Tip(tip);

    // Save the Tip
    tipObj.save(function () {
      // Try deleting Tip
      request(app).delete('/api/tips/' + tipObj._id)
        .expect(403)
        .end(function (tipDeleteErr, tipDeleteRes) {
          // Set message assertion
          (tipDeleteRes.body.message).should.match('User is not authorized');

          // Handle Tip error error
          done(tipDeleteErr);
        });

    });
  });

  it('should be able to get a single Tip that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Tip
          agent.post('/api/tips')
            .send(tip)
            .expect(200)
            .end(function (tipSaveErr, tipSaveRes) {
              // Handle Tip save error
              if (tipSaveErr) {
                return done(tipSaveErr);
              }

              // Set assertions on new Tip
              (tipSaveRes.body.name).should.equal(tip.name);
              should.exist(tipSaveRes.body.user);
              should.equal(tipSaveRes.body.user._id, orphanId);

              // force the Tip to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Tip
                    agent.get('/api/tips/' + tipSaveRes.body._id)
                      .expect(200)
                      .end(function (tipInfoErr, tipInfoRes) {
                        // Handle Tip error
                        if (tipInfoErr) {
                          return done(tipInfoErr);
                        }

                        // Set assertions
                        (tipInfoRes.body._id).should.equal(tipSaveRes.body._id);
                        (tipInfoRes.body.name).should.equal(tip.name);
                        should.equal(tipInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Tip.remove().exec(done);
    });
  });
});
