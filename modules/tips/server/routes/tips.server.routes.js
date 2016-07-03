'use strict';

/**
 * Module dependencies
 */
var tipsPolicy = require('../policies/tips.server.policy'),
  tips = require('../controllers/tips.server.controller');

module.exports = function(app) {
  // Tips Routes
  app.route('/api/tips').all(tipsPolicy.isAllowed)
    .get(tips.list)
    .post(tips.create);

  app.route('/api/tips/:tipId').all(tipsPolicy.isAllowed)
    .get(tips.read)
    .put(tips.update)
    .delete(tips.delete);

  // Finish by binding the Tip middleware
  app.param('tipId', tips.tipByID);
};
