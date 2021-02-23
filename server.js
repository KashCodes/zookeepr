// required package/constructor/module
const express = require('express');

// tell our app (heroku) to use that port, if it has been set, and if not, default to port 80.
const PORT = process.env.PORT || 3001;

// instantiate the server, to tell it to listen for requests
const app = express();

// creating a route that the front-end can request data from.
const { animals } = require('./data/animals');



// This function will take in `req.query` as an argument and filter through the animals accordingly, returning the new filtered array. 
function filterByQuery(query, animalsArray) {
  let personalityTraitsArray = [];
  // Note that we save the animalsArray as filteredResults here:
  let filteredResults = animalsArray;
  if (query.personalityTraits) {
    // Save personalityTraits as a dedicated array.
    // If personalityTraits is a string, place it into a new array and save.
    if (typeof query.personalityTraits === 'string') {
      personalityTraitsArray = [query.personalityTraits];
    } else {
      personalityTraitsArray = query.personalityTraits;
    }
    // Loop through each trait in the personalityTraits array:
    personalityTraitsArray.forEach(trait => {
      // Check the trait against each animal in the filteredResults array.
      // Remember, it is initially a copy of the animalsArray,
      // but here we're updating it for each trait in the .forEach() loop.
      // For each trait being targeted by the filter, the filteredResults
      // array will then contain only the entries that contain the trait,
      // so at the end we'll have an array of animals that have every one 
      // of the traits when the .forEach() loop is finished.
      filteredResults = filteredResults.filter(
        animal => animal.personalityTraits.indexOf(trait) !== -1
      );
    });
  }
  if (query.diet) {
    filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
  }
  if (query.species) {
    filteredResults = filteredResults.filter(animal => animal.species === query.species);
  }
  if (query.name) {
    filteredResults = filteredResults.filter(animal => animal.name === query.name);
  }
  // return the filtered results:
  return filteredResults;
}


// Takes in the id and array of animals and returns a single animal object
function findById(id, animalsArray) {
  const result = animalsArray.filter(animal => animal.id === id)[0];
  return result;
}












/*    the get() method requires two arguments. The first is a string that describes the route the client will have to fetch from. The second is a callback function that will execute every time that route is accessed with a GET request. --- we can use the send() method from the res parameter (short for response) to send the strings for example, to our client. ---  To send JSON, just change send to json. We do this to change the headers (i.e., additional metadata that's sent with every request/response) so that the client knows it's receiving JSON. -- function called filterByQuery() is going to help us handle different kinds of queries.  */

// add the route for const { animals }
app.get('/api/animals', (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

/* Now that we have multiple routes, we have to pay extra attention to the order of the routes. A param route must come after the other GET route. There's a function called findById() in the callback that looks just like filterByQuery(), except this time we're passing req.params.id. We don't use filterByQuery() instease bc, we know for certain that this route should only return a single animal, because the id is unique.--- req.query is multifaceted, often combining multiple parameters, whereas req.param is specific to a single property, often intended to retrieve a single record. */

// The req object gives us access to another property for this case, `req.params`. Unlike the query object, the param object needs to be defined in the route path, with `<route>/:<parameterName>`. This is a new GET route for animals, after the first one, this time adding :id to the end of the route. If the ID can't be found it will return a 404 error. 
app.get('/api/animals/:id', (req, res) => {
  const result = findById(req.params.id, animals);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});



/* Notice that this is just another method of the `app` object that allows us to create routes, much like `app.get()`. This method doesn't say `get` though—it says `post`, which means that we defined a route that listens for POST requests, not GET requests. POST requests differ from GET requests in that they represent the action of a client requesting the server to accept data rather than vice versa. --- notice the route name, `/api/animals` is the same as the GET requests. It'll know which route to use because of how we form the request.    */

//  set up a route on our server that accepts data to be used or stored server-side.
app.post('/api/animals', (req, res) => {
  // req.body is where our incoming content will be
  console.log(req.body);
  res.json(req.body);
});









// assign express() to the app variable so that we can later chain on methods to the Express.js server. --- method to make our server listen. References hardcoded PORT in beginning of code(3001), or defaults to 80. 
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

//  stop the previous server by entering `Ctrl+c` and then `Y` at the prompt (if you are prompted), then run `npm start` to start the server again. This time, once the server has started, navigate to http://localhost:3001/api/animals (Links to an external site.) in your browser..
// git push heroku feature/MVP:main