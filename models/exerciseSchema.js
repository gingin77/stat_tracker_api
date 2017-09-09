const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
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

const Exercise = mongoose.model('Exercise', exerciseSchema)
module.exports = Exercise
