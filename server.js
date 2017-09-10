const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const Exercise = require('./models/exerciseSchema')
const bodyParser = require('body-parser')

// mongoose instance connection url connection
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/Tododb')


app.use(function (req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const routes = require('./routes/activities')
routes(app)//register the route

// const statsRouter = require('./routes/stats')
// statsRouter(app)

// app.use('/activities', activitiesRouter)
// app.use('/stats', statsRouter)

app.listen(port)


console.log('exercise list RESTful API server started on: ' + port)
