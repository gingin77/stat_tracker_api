const mongoose = require('mongoose')
const moment = require('moment')

mongoose.connect('mongodb://localhost:27017/exercisesdb')

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
  created_date: {
    type: Date,
    default: moment()
  },
  updated_date: {
    type: Date,
    default: moment()
  }
})

module.exports = mongoose.model('Exercise', exerciseSchema)
