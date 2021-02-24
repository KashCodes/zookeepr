// Server functions for zookeepers //

//  required package/constructor/module
const fs = require("fs");
const path = require("path");


// This function will take in `req.query` as an argument and filter through the zookeepers accordingly, returning the new filtered array. 
function filterByQuery(query, zookeepers) {
  let filteredResults = zookeepers;
  if (query.age) {
    filteredResults = filteredResults.filter(
      // Since our form data will be coming in as strings, and our JSON is storing
      // age as a number, we must convert the query string to a number to
      // perform a comparison:
      (zookeeper) => zookeeper.age === Number(query.age)
    );
  }
  if (query.favoriteAnimal) {
    filteredResults = filteredResults.filter(
      (zookeeper) => zookeeper.favoriteAnimal === query.favoriteAnimal
    );
  }
  if (query.name) {
    filteredResults = filteredResults.filter(
      (zookeeper) => zookeeper.name === query.name
    );
  }
  return filteredResults;
}


// Takes in the id and array of zookeepers and returns a single animal object
function findById(id, zookeepers) {
  const result = zookeepers.filter((zookeeper) => zookeeper.id === id)[0];
  return result;
}


//  function to handle taking the data from req.body and adding it to our zookeepers.json file.
function createNewZookeeper(body, zookeepers) {
  const zookeeper = body;
  // push saves data in array
  zookeepers.push(zookeeper);
  // writes data to the file.
  fs.writeFileSync(
    // specifies the file being written is in a sub directory
    path.join(__dirname, "../data/zookeepers.json"),
    // converts JS Array to JSON format. Null ensures we don't edit existing data, 2 indicates we want to create white space between our values to make it more readable.
    JSON.stringify({ zookeepers }, null, 2)
  );
  return zookeeper;
}


// It is going to take our new zookeeper data from req.body and check if each key not only exists, but that it is also the right type of data.
function validateZookeeper(zookeeper) {
  if (!zookeeper.name || typeof zookeeper.name !== "string") {
    return false;
  }
  if (!zookeeper.age || typeof zookeeper.age !== "number") {
    return false;
  }
  if (
    !zookeeper.favoriteAnimal ||
    typeof zookeeper.favoriteAnimal !== "string"
  ) {
    return false;
  }
  return true;
}

module.exports = {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
};
