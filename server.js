const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const router = express.Router()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const mongoOp = require('./models/exerciseSchema')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

router.get('/', function(req,res){
  res.json({
    "error": false,
    "message": "Hello World"})
})

router.route("/activities")

    .get(function(req,res){
        var response = {}
        mongoOp.find({},function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data}
            }
            res.json(response)
        })
    })

    .post(function(req,res){
      var db = new mongoOp()
      var response = {}
      // db.exercise_activity = req.body.exercise_activity
      // db.distance_miles = req.body.distance_miles
      db = req.body
      console.log(db)
      db.save(function (err) {
        if(err) {
              response = {'error': true, 'message': 'Error adding data'}
          } else {
              response = {"error" : false,"message" : "Data added"}
        }
        res.json(response)
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
