const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const Exercise = require('./models/exerciseSchema')

//created model loading here
const bodyParser = require('body-parser')

// mongoose instance connection url connection
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/exercisedb')


app.use(function (req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// app.use(session({
//   secret: 'something',
//   resave: false,
//   saveUninitialized: true
// }))

// const routes = require('./routes/stat_trackerRoutes') //importing route
const activitiesRouter = require('./routes/activities')
const statsRouter = require('./routes/stats')
activitiesRouter(app)//register the route
statsRouter(app)

// app.use('/activities', activitiesRouter)
// app.use('/stats', statsRouter)

app.listen(port)


console.log('exercise list RESTful API server started on: ' + port)
