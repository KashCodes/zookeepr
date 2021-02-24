// Jest tests for Zookeepers Script //

// required modules and routes:
const fs = require("fs");
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require("../lib/zookeepers.js");
const { zookeepers } = require("../data/zookeepers");


// will mock/fake writing to the file
jest.mock("fs");

// tests to create zookeeper object
test("creates an zookeeper object", () => {
  const zookeeper = createNewZookeeper(
    { name: "Darlene", id: "jhgdja3ng2" },
    zookeepers
  );

  expect(zookeeper.name).toBe("Darlene");
  expect(zookeeper.id).toBe("jhgdja3ng2");
});


// tests to ensure query filter works
test("filters by query", () => {
  const startingZookeepers = [
    {
      id: "2",
      name: "Raksha",
      age: 31,
      favoriteAnimal: "penguin",
    },
    {
      id: "3",
      name: "Isabella",
      age: 67,
      favoriteAnimal: "bear",
    },
  ];

  const updatedZookeepers = filterByQuery({ age: 31 }, startingZookeepers);

  expect(updatedZookeepers.length).toEqual(1);
});


// tests to ensure filter/finds by ID works
test("finds by id", () => {
  const startingZookeepers = [
    {
      id: "2",
      name: "Raksha",
      age: 31,
      favoriteAnimal: "penguin",
    },
    {
      id: "3",
      name: "Isabella",
      age: 67,
      favoriteAnimal: "bear",
    },
  ];

  const result = findById("3", startingZookeepers);

  expect(result.name).toBe("Isabella");
});


// tests to ensure vaildation is working on the zookeeper form submitted to be fille dout correctly.
test("validates age", () => {
  const zookeeper = {
    id: "2",
    name: "Raksha",
    age: 31,
    favoriteAnimal: "penguin",
  };

  const invalidZookeeper = {
    id: "3",
    name: "Isabella",
    age: "67",
    favoriteAnimal: "bear",
  };

  const result = validateZookeeper(zookeeper);
  const result2 = validateZookeeper(invalidZookeeper);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});