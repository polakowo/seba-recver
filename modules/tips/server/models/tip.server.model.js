'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Tip Schema
 */
var TipSchema = new Schema({
  title: {
    type: String,
    default: '',
    required: 'Please fill Tip name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    default: ''
  }
});

mongoose.model('Tip', TipSchema);
