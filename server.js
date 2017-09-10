const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const router = express.Router()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const Exercise = require('./models/exerciseSchema')
const moment = require('moment')

moment().format()
const now = moment()
const today = moment().startOf('day')
const yesterday = moment(today).add(-1, 'days')
const tommorrow = moment(today).add(1, 'days')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', router)
mongoose.connect('mongodb://localhost:27017/exercisesdb')

app.listen(port)
console.log('exercise list RESTful API server started on: ' + port)

router.get('/', function (req, res) {
  res.json({
    'error': false,
    'message': 'Hello World'
  })
})

router.route('/activities')
  .get(function (req, res) {
    Exercise.find()
      .then(function (exercise) {
        res.json(exercise)
      })
    .catch(function (err) {
      if (err) {
        res.send('Error fetching data')
      }
    })
  })

  .post(function (req, res) {
    Exercise.create(req.body)
      .then(function (exercise) {
        res.redirect('/activities')
      })
      .catch(function (err) {
        if (err) {
          res.send('Error fetching data')
        }
      })
  })

router.route('/activities/:id')
  .get(function (req, res) {
    Exercise.findOne({ _id: req.params.id })
      .then(function (exercise) {
        res.json(exercise)
      })
      .catch(function (err) {
        if (err) {
          res.send('Error fetching data')
        }
      })
  })

  .put(function (req, res) {
    const updatedActivity = {
      exercise_activity: req.body.exercise_activity,
      distance_miles: req.body.distance_miles,
      mins_per_mile: req.body.mins_per_mile,
      weight_level_lbs: req.body.weight_level_lbs,
      reps: req.body.reps,
      sets: req.body.sets,
      updated_date: moment()
    }
    Exercise.updateOne({ _id: req.params.id}, updatedActivity)
      .then(function (exercise) {
        res.json(exercise)
      })
      .catch(function (err) {
        if (err) {
          res.send('Error fetching data')
        }
      })
  })

  .delete(function (req, res) {
    Exercise.findByIdAndRemove({ _id: req.params.id })
      .then(function (exercise) {
        res.json(exercise)
      })
      .catch(function (err) {
        if (err) {
          res.send('Error fetching data')
        }
      })
  })
// The 2nd to last route says the following, which doesn't make sense to me:

// POST	/activities/{id}/stats	Add tracked data for a day. The data sent with this should include the day tracked. You can also override the data for a day already recorded.

// It seems the above route is indicating that you would be recalling a specific activity (because id is part of the route) based on the stats. Since the id is unique, I don't see how this would be useful.

// Instead, I'm going to try setting up a route that allows a user to call up all activities from a given days and make copies.

// I've set up moment. the variables I set log as follows:
// console.log(today)  moment("2017-09-10T00:00:00.000")
// console.log(tommorrow)  moment("2017-09-11T00:00:00.000")
// console.log(yesterday)  moment("2017-09-09T00:00:00.000")

router.route('/activities/bydate/:created_date')
  .get(function(req, res) {
    const updatedDate = tommorrow
    // console.log(req.params.dateid)
    // console.log(typeof req.params.dateid)
    // let convertedDate = req.params.dateid.toString
    // console.log(convertedDate)
    // Exercise.find({
    //   create_date: {"$regex": req.params.dateid}})
    Exercise.find({
        created_date: req.params.created_date
      })
      .then(function(exercise) {
        res.json(exercise)
      })
      .catch(function(err) {
        if (err) {
          response = {
            'error': true,
            'message': 'Error fetching data'
          };
        } else {
          response = {
            'error': false,
            'message': data
          }
        }
      })
  })

  .delete(function(req, res) {
    Exercise.remove({
        created_date: req.params.created_date
      })
      // ({created_date: { "$regex": req.params.date, "$options": "i"}})
      .then(function(exercise) {
        console.log(typeof req.params.date);
        res.redirect('/activities')
      })
      .catch(function(err) {
        if (err) {
          response = {
            'error': true,
            'message': 'Error fetching data'
          };
        } else {
          response = {
            'error': false,
            'message': data
          }
        }
      })
  })
