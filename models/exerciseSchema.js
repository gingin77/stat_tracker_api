// 'use strict'
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/exercisesdb')
const mongoSchema = mongoose.Schema

const exerciseSchema = ({
  exercise_activity: {
    type: String
  },
  distance_miles: {
    type: Number
  }, /* ie number of miles (use measure field) */
  mins_per_mile: {
    type: Number
  },
  weight_level_lbs: {
    type: Number
  },
  reps: {
    type: Number
  },
  sets: {
    type: Number
  },
  create_date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Exercise', exerciseSchema)
