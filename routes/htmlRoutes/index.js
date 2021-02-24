// Server Routes for HTML //

// declares paths being used 
const path = require('path');
// decalres routes in the server versus using app
const router = require('express').Router();



/* just one job to do, and that is to respond with an HTML page to display in the browser. So instead of using res.json(), we're using res.sendFile(), and all we have to do is tell them where to find the file we want our server to read and send back to the client.  ---  Notice in the res.sendFile() that we're using the path module again to ensure that we're finding the correct location for the HTML code we want to display in the browser. This way, we know it will work in any server environment!       */

// the `/` route points  to the root route of the server and is used to create a homepage for a server.
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// This path will take us to the animals page 
router.get('/animals', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/animals.html'));
});

// this path will connect us to the zookeepers page 
router.get('/zookeepers', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});


// export router 
module.exports  = router;


