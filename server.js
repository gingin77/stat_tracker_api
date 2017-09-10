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

app.use('/', router)

// // mongoose instance connection url connection
// mongoose.Promise = global.Promise
// mongoose.connect('mongodb://localhost/Tododb')
//
//
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
