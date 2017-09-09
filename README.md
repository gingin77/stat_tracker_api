# stat_tracker_api

Notes recored while working on this project.

For routes:
  const activitiesRouter = require('./routes/activities)

// routers
  app.use('/', rootRouter)
  app.use('/api', apiRouter)
Create 2 routes files
  /activities

Start with defining the Schema
What are the main items to store? How are their attributes going to be defined?
 /If this is an assignment, keep things simple. If this is going to be used to manage a project database that multiple groups will be accessing, then take time to consult with multiple parties to find out what info people will need from the db./

For my current assignment, I need to be able to do the following reqests:

/activities
	- GET a list of all activities, with links to each activities’ page
	- POST a new activity

```
exports.list_all_exercises = function(req, res) {
	Exercise.find({}, function(err, exercise) {
		if (err)
			res.send(err)
		res.json(exercise)
	})
}
```

For each route, I need to set up a constant variable that defines the file path, so:
```
const activitiesRouter = require('./routes/activities)
```

And, I want to refer to this path as middleware, so I need to state the following:
```
app.use(‘/activities’, activitiesRouter)
```


For each individual activity ( /activities/{id} ), I need to:
	- GET -  Show information about one activity I am tracking, and give me the data I have recorded for that activity.
	- PUT - Update one activity I am tracking, changing attributes such as name or type. Does not allow for changing tracked data.
	- DELETE - Delete one activity I am tracking. This should remove tracked data for that activity as well.
	- Add tracked data for a day. The data sent with this should include the day tracked. You can also override the data for a day already recorded.

To define my routes,  I added the following to my server.js file:
```
  const activitiesRouter = require('./routes/activities')
  const statsRouter = require('./routes/stats')

  app.use('/activities', activitiesRouter)
  app.use('/stats', statsRouter)
```

If organizing the app with a file for controllers, models, and routes (as shown here: [Build Node.js RESTful APIs in 10 Minutes | Codementor](https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd)), then:
	- The *controller* file contains the *route handler functions* - the actions to be executed depending on the route that is called
	- The *Routes.js file makes associations between the routes and the route handler functions defined in the controller file.
	* 	Within the *Routes.js file, there is a single function that takes app as an argument, which is assigned to module.exports
		* the first var in the function requires the Controller (the file the defines the route handlers)
		* then, there is a route path followed by a http request verb and the name of a route handler function listed in the Controller

```
app.route('/activities')
	.get(name of variable associated with the controller.function_name)

```
