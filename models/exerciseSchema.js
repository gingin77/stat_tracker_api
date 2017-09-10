'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// const mongoose = require('mongoose')

const exerciseSchema = new Schema({
  exercises: {
    type: String
  },
  stats: {
    type: [{
      distance: Number, /* ie number of miles (use measure field) */
      level: Number,
      reps: Number, /* ie number of */
      measure: String /* ie miles or pounds */
    }]
  },
  create_date: {
    type: Date,
    default: Date.now
  }
})


module.exports = mongoose.model('Exercise', exerciseSchema)
