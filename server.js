// required package/constructor/module
const express = require('express');
const fs = require('fs');
const path = require('path');

// creating routes to sub directories that utilize the router module instead of our server GET requests 
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');


// tell our app (heroku) to use that port, if it has been set, and if not, default to port 80.
const PORT = process.env.PORT || 3001;

// instantiate the server, to tell it to listen for requests
const app = express();

//--------Middleware-------------//
/* The `app.use()` method (used in conjunction with the `app.post` function method) is a method executed by our Express.js server that mounts a function to the server that our requests will pass through before getting to the intended endpoint. The functions we can mount to our server are referred to as middleware. --- Middleware functions can serve many different purposes. Ultimately they allow us to keep our route endpoint callback functions more readable while letting us reuse functionality across routes to keep our code DRY. --- Both The `express.urlencoded({extended: true})` method and The `express.json()` method middleware functions need to be set up every time you create a server that's looking to accept POST data.     */

// ***parse incoming string or array data*** //
// The `express.urlencoded({extended: true})` method is a method built into Express.js. It takes incoming POST data and converts it to key/value pairings that can be accessed in the req.body object. The extended: true option set inside the method call informs our server that there may be sub-array data nested in it as well, so it needs to look as deep into the POST data as possible to parse all of the data correctly.
app.use(express.urlencoded({ extended: true }));

// ***parse incoming JSON data*** //
// The `express.json()` method we used takes incoming POST data in the form of JSON and parses it into the req.body JavaScript object. 
app.use(express.json());


//  telling the server that any time a client navigates to `<ourhost>/api`, the app will use the router we set up in apiRoutes. If `/` is the endpoint, then the router will serve back our HTML routes.
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


/*middleware that uses the express.static() method. The way it works is that we provide a file path to a location in our application (in this case, the public folder) and instruct the server to make these files static resources. This means that all of our front-end code can now be accessed without having a specific server endpoint created for it!      */

//instructs the server to make certain files readily available and to not gate it behind a server endpoint.
app.use(express.static('public'));
//------------ Middlewar ends ---------------//

// creating a route that the front-end can request data from.
const { animals } = require('./data/animals');


















// assign express() to the app variable so that we can later chain on methods to the Express.js server. --- method to make our server listen. References hardcoded PORT in beginning of code(3001), or defaults to 80. 
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

//  stop the previous server by entering `Ctrl+c` and then `Y` at the prompt (if you are prompted), then run `npm start` to start the server again. This time, once the server has started, navigate to http://localhost:3001/api/animals (Links to an external site.) in your browser..
// git push heroku feature/MVP:main