const express = require('express')
const app = express()

const router = express.Router({mergeParams: true})

module.exports = function (app) {
  const exercises = require('../controllers/stat_trackerController')

  // todoList Routes
  app.route('/')
    .get (exercises.list_all_exercises)
    .post (exercises.create_a_new_exercise_log)

  app.route('/:id')
    .get (exercises.read_an_exercise)
    .put (exercises.update_an_exercise)
    .delete (exercises.delete_an_exercise)
}
