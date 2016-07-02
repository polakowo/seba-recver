'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Workshop Schema
 */
var WorkshopSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    default: 'Online course',
    trim: true,
    required: 'Workshop type must be specified'
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  location: {
    type: String,
    default: 'Munich',
    trim: true
  },
  video_url: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Workshop', WorkshopSchema);
