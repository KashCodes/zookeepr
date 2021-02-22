// required package/constructor/module
const express = require('express');

// instantiate the server, to tell it to listen for requests
const app = express();

// creating a route that the front-end can request data from.
const { animals } = require('./data/animals');




/*    the get() method requires two arguments. The first is a string that describes the route the client will have to fetch from. The second is a callback function that will execute every time that route is accessed with a GET request. --- we are using the send() method from the res parameter (short for response) to send the string Hello! to our client.   */

// add the route for const { animals }
app.get('/api/animals', (req, res) => {
  res.send('Hello!');
});

// assign express() to the app variable so that we can later chain on methods to the Express.js server. --- method to make our server listen.
app.listen(3001, () => {
  console.log(`API server now on port 3001!`);
});