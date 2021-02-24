// Server Routes for Zookeepers //

// decalres routes in the server versus using app
const router = require("express").Router();
// Imports files 
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require("../../lib/zookeepers");
const { zookeepers } = require("../../data/zookeepers");


/*  see notes in animalRoutes.js for full breakdown */

// add the route for const { animals }
router.get("/zookeepers", (req, res) => {
  let results = zookeepers;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});


// If the ID can't be found it will return a 404 error. 
router.get("/zookeepers/:id", (req, res) => {
  const result = findById(req.params.id, zookeepers);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});


//  set up a route on our server that accepts data to be used or stored server-side and added to the body of the JSON file. 
router.post("/zookeepers", (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = zookeepers.length.toString();

  // if any data in req.body is incorrect, send 400 error back
  if (!validateZookeeper(req.body)) {
    // `res.status().send()`; is a response method to relay a message to the client making the request
    res.status(400).send("The zookeeper is not properly formatted.");
  } else {
    // callback to run/create a new animal and write it to the body of zookeepers
    const zookeeper = createNewZookeeper(req.body, zookeepers);
    res.json(zookeeper);
  }
});

// export router 
module.exports = router;