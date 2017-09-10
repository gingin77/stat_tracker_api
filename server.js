const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const router = express.Router()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const Exercise = require('./models/exerciseSchema')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

router.get('/', function(req,res){
  res.json({
    "error": false,
    "message": "Hello World"})
})

router.route('/activities')
    .get(function (req, res) {
        var response = {}
        Exercise.find({},function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {'error' : true,'message' : 'Error fetching data'};
            } else {
                response = {'error' : false,'message' : data}
            }
            res.json(response)
        })
    })

    .post(function(req,res){
      Exercise.create(req.body)
      .then(function(exercise) {
        res.redirect('/activities')
      })
      .catch(function (err) {
        if(err) {
            response = {'error' : true,'message' : 'Error fetching data'};
        } else {
            response = {'error' : false,'message' : data}
        }
      })
    })

router.route('/activities/:id')
    .get(function (req, res) {
      Exercise.findOne({_id: req.params.id})
      .then(function(exercise) {
        res.json(exercise)
      })
      .catch(function (err) {
        if(err) {
            response = {'error' : true,'message' : 'Error fetching data'};
        } else {
            response = {'error' : false,'message' : data}
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
        create_date: req.body.create_date
      }
      console.log(updatedActivity)

      Exercise.updateOne({_id: req.params.id}, updatedActivity)
        .then(function(exercise) {
          res.json(exercise)
        })
        .catch(function (err) {
          if(err) {
              response = {'error' : true,'message' : 'Error fetching data'};
          } else {
              response = {'error' : false,'message' : data}
          }
        })
    })


app.use('/', router)

// mongoose instance connection url connection
// mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/exercisesdb')


// app.use(function (req, res) {
//   res.status(404).send({url: req.originalUrl + ' not found'})
// })
//
//
//
// const routes = require('./routes/activities')
// routes(app)//register the route

// const statsRouter = require('./routes/stats')
// statsRouter(app)

// app.use('/activities', activitiesRouter)
// app.use('/stats', statsRouter)

app.listen(port)
console.log('exercise list RESTful API server started on: ' + port)
