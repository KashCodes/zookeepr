// adding middleware so that our app knows about the routes in animalRoutes.js. //

/* Doing it this way, we're using apiRoutes/index.js as a central hub for all routing functions we may want to add to the application. It may seem like overkill with just one exported module, but as your application evolves, it will become a very efficient mechanism for managing your routing code and keeping it modularized.    */

// requires router module
const router = require('express').Router();
//we're having it use the module exported from animalRoutes.js.
const animalRoutes = require('../apiRoutes/animalRoutes');

router.use(animalRoutes);

module.exports = router;