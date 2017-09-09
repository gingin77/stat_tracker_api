const mongoose = require('mongoose'),
  Exercise = mongoose.model('Exercise')
// module.exports = mongoose.model('Exercise', ExerciseSchema) << from exerciseSchema.js

exports.list_all_exercises = function (req, res) {
  Exercise.find({}, function (err, exercise) {
    if (err) {
      res.send(err)
    }
    res.json(exercise)
  })
}

exports.create_a_new_exercise_log = function (req, res) {
  var newExercise = new Exercise(req.body)
  newExercise.save(function (err, exercise) {
    if (err) {
      res.send(err)
    }
    res.json(exercise)
  })
}

exports.read_an_exercise = function (req, res) {
  Exercise.findById(req.params.id, function (err, exercise) {
    if (err) {
      res.send(err)
    }
    res.json(exercise)
  })
}

exports.update_an_exercise = function (req, res) {
  Exercise.findOneAndUpdate ({_id: req.params.id}, req.body, {new: true}, function (err, exercise) {
    if (err) {
      res.send(err)
    }
    res.json(exercise)
  })
}

exports.delete_an_exercise = function (req, res) {
  Exercise.remove({ _id: req.params.id }, function (err, exercise) {
    if (err) {
      res.send(err)
    }
    res.json({ message: 'Task successfully deleted' })
  })
}

exports.delete_daily_stats = function (req, res) {
  Exercise.remove({ create_date: req.params.create_date }, function (err, exercise) {
    if (err) {
      res.send(err)
    }
    res.json({ message: 'Daily activities successfully deleted' })
  })
}
