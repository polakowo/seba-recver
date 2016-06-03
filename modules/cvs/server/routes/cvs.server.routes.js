'use strict';

/**
 * Module dependencies
 */
var cvsPolicy = require('../policies/cvs.server.policy'),
  cvs = require('../controllers/cvs.server.controller');

module.exports = function (app) {
  // CVs collection routes
  app.route('/api/cvs').all(cvsPolicy.isAllowed)
    .get(cvs.list)
    .post(cvs.create);

  // Single cv routes
  app.route('/api/cvs/:cvId').all(cvsPolicy.isAllowed)
    .get(cvs.read)
    .put(cvs.update)
    .delete(cvs.delete);

  // Finish by binding the cv middleware
  app.param('cvId', cvs.cvByID);
};
