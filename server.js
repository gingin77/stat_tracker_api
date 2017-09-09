const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
  mongoose = require('mongoose'),
  Task = require('./models/todosSchema'),

  //created model loading here
  bodyParser = require('body-parser')

  // mongoose instance connection url connection
  mongoose.Promise = global.Promise
  mongoose.connect('mongodb://localhost/Tododb')

  app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
  })

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())


  var routes = require('./routes/stat_trackerRoutes') //importing route
  routes(app) //register the route


  app.listen(port)


  console.log('todo list RESTful API server started on: ' + port)
