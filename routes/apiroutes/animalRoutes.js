// Server Routes for Animals //

// decalres routes in the server versus using app
const router = require('express').Router();
// Imports files 
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');



/*  All `app.XYZ` has been changed to `router.XYZ` due to it being in a sub directory and the server needing to route from the main server.js file to these sub directories.  ---  the get() method requires two arguments. The first is a string that describes the route the client will have to fetch from. The second is a callback function that will execute every time that route is accessed with a GET request. --- we can use the send() method from the res parameter (short for response) to send the strings for example, to our client. ---  To send JSON, just change send to json. We do this to change the headers (i.e., additional metadata that's sent with every request/response) so that the client knows it's receiving JSON. -- function called filterByQuery() is going to help us handle different kinds of queries.  */

// add the route for const { animals }
router.get("/animals", (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

/*  All `app.XYZ` has been changed to `router.XYZ` due to it being in a sub directory and the server needing to route from the main server.js file to these sub directories.  ---   Now that we have multiple routes, we have to pay extra attention to the order of the routes. A param route must come after the other GET route. There's a function called findById() in the callback that looks just like filterByQuery(), except this time we're passing req.params.id. We don't use filterByQuery() instease bc, we know for certain that this route should only return a single animal, because the id is unique.--- req.query is multifaceted, often combining multiple parameters, whereas req.param is specific to a single property, often intended to retrieve a single record. */

// The req object gives us access to another property for this case, `req.params`. Unlike the query object, the param object needs to be defined in the route path, with `<route>/:<parameterName>`. This is a new GET route for animals, after the first one, this time adding :id to the end of the route. If the ID can't be found it will return a 404 error. 
router.get("/animals/:id", (req, res) => {
  const result = findById(req.params.id, animals);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});



/*  All `app.XYZ` has been changed to `router.XYZ` due to it being in a sub directory and the server needing to route from the main server.js file to these sub directories.  ---   Notice that this is just another method of the `app` object that allows us to create routes, much like `app.get()`. This method doesn't say `get` though—it says `post`, which means that we defined a route that listens for POST requests, not GET requests. POST requests differ from GET requests in that they represent the action of a client requesting the server to accept data rather than vice versa. --- notice the route name, `/api/animals` is the same as the GET requests. It'll know which route to use because of how we form the request. --- we also need to set up functionality on the server so it can receive data from the client. --- In order for our server to accept incoming data the way we need it to, we need to tell our Express.js app to intercept our POST request before it gets to the callback function. At that point, the data will be run through a couple of functions to take the raw data transferred over HTTP and convert it to a JSON object. --- This is done with middleware functions, specifically the `app.use` method functions called at the top of the page.   */

//  set up a route on our server that accepts data to be used or stored server-side and added to the body of the JSON file. 
router.post('/animals', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = animals.length.toString();

  // if any data in req.body is incorrect, send 400 error back
  if (!validateAnimal(req.body)) {
    // `res.status().send()`; is a response method to relay a message to the client making the request
    res.status(400).send('The animal is not properly formatted.');
  } else {
    // callback to run/create a new animal and write it to the body of animals
    const animal = createNewAnimal(req.body, animals);
    res.json(animal);
  }
});

// export router 
module.exports  = router;