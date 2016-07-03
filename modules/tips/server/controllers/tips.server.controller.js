'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Tip = mongoose.model('Tip'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Tip
 */
exports.create = function(req, res) {
  var tip = new Tip(req.body);
  tip.user = req.user;

  tip.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(tip);
    }
  });
};

/**
 * Show the current Tip
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var tip = req.tip ? req.tip.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  tip.isCurrentUserOwner = req.user && tip.user && tip.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(tip);
};

/**
 * Update a Tip
 */
exports.update = function(req, res) {
  var tip = req.tip ;

  tip = _.extend(tip , req.body);

  tip.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(tip);
    }
  });
};

/**
 * Delete an Tip
 */
exports.delete = function(req, res) {
  var tip = req.tip ;

  tip.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(tip);
    }
  });
};

/**
 * List of Tips
 */
exports.list = function(req, res) { 
  Tip.find().sort('-created').populate('user', 'displayName').exec(function(err, tips) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(tips);
    }
  });
};

/**
 * Tip middleware
 */
exports.tipByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Tip is invalid'
    });
  }

  Tip.findById(id).populate('user', 'displayName').exec(function (err, tip) {
    if (err) {
      return next(err);
    } else if (!tip) {
      return res.status(404).send({
        message: 'No Tip with that identifier has been found'
      });
    }
    req.tip = tip;
    next();
  });
};
