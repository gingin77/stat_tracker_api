module.exports = function (app) {
  const exercises = require('../controllers/stat_trackerController')

  // todoList Routes
  app.route('/stats')
    .delete (exercises.list_all_exercises)
}

//Remove tracked data for a day.
