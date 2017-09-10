'use strict'
module.exports = function (app) {
  const exerciseList = require('../controllers/stat_trackerController')

  //Routes
  app.route('/activities')
    .get (exerciseList.list_all_exercises)
    .post (exerciseList.create_a_new_exercise_log)

  app.route('/activities/:id')
    .get (exerciseList.read_an_exercise)
    .put (exerciseList.update_an_exercise)
    .delete (exerciseList.delete_an_exercise)

  // app.route('/stats')
  //   .delete (exerciseList.list_all_exerciseList)
}
