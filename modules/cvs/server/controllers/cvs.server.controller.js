'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  CV = mongoose.model('CV'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an cv
 */
exports.create = function (req, res) {
  var cv = new CV(req.body);
  cv.user = req.user;

  cv.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(cv);
    }
  });
};

/**
 * Show the current cv
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var cv = req.cv ? req.cv.toJSON() : {};

  // Add a custom field to the CV, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the CV model.
  cv.isCurrentUserOwner = !!(req.user && cv.user && cv.user._id.toString() === req.user._id.toString());

  res.json(cv);
};

/**
 * Update an cv
 */
exports.update = function (req, res) {
  var cv = req.cv;

  cv.title = req.body.title;
  cv.content = req.body.content;

  cv.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(cv);
    }
  });
};
/**
 * Duplicate a cv
 */
exports.duplicate = function (req, res) {
  if (req.cv._id) {
    delete req.cv._id;
  }
  var cv = new CV(req.cv);
  
  cv.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(cv);
    }
  });
};

/**
 * Delete an cv
 */
exports.delete = function (req, res) {
  var cv = req.cv;

  cv.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(cv);
    }
  });
};

/**
 * List of CVs
 */
exports.list = function (req, res) {
  CV.find().sort('-created').populate('user', 'displayName').exec(function (err, cvs) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(cvs);
    }
  });
};

/**
 * CV middleware
 */
exports.cvByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'CV is invalid'
    });
  }

  CV.findById(id).populate('user', 'displayName').exec(function (err, cv) {
    if (err) {
      return next(err);
    } else if (!cv) {
      return res.status(404).send({
        message: 'No cv with that identifier has been found'
      });
    }
    req.cv = cv;
    next();
  });
};
