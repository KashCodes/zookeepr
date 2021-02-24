// Jest tests for Animals Script // 

// required modules and routes:
const fs = require("fs");
const {
  filterByQuery,
  findById,
  createNewAnimal,
  validateAnimal,
} = require("../lib/animals.js");
const { animals } = require("../data/animals");

// will mock/fake writing to the file 
jest.mock('fs');

// tests to create animal object
test("creates an animal object", () => {
  const animal = createNewAnimal(
    { name: "Darlene", id: "jhgdja3ng2" },
    animals
  );

  expect(animal.name).toBe("Darlene");
  expect(animal.id).toBe("jhgdja3ng2");
});

// tests to ensure query filter works
test("filters by query", () => {
  const startingAnimals = [
    {
      id: "3",
      name: "Erica",
      species: "gorilla",
      diet: "omnivore",
      personalityTraits: ["quirky", "rash"],
    },
    {
      id: "4",
      name: "Noel",
      species: "bear",
      diet: "carnivore",
      personalityTraits: ["impish", "sassy", "brave"],
    },
  ];

  const updatedAnimals = filterByQuery({ species: "gorilla" }, startingAnimals);

  expect(updatedAnimals.length).toEqual(1);
});


// tests to ensure filter/finds by ID works
test("finds by id", () => {
  const startingAnimals = [
    {
      id: "3",
      name: "Erica",
      species: "gorilla",
      diet: "omnivore",
      personalityTraits: ["quirky", "rash"],
    },
    {
      id: "4",
      name: "Noel",
      species: "bear",
      diet: "carnivore",
      personalityTraits: ["impish", "sassy", "brave"],
    },
  ];

  const result = findById("3", startingAnimals);

  expect(result.name).toBe("Erica");
});


// tests to ensure vaildation is working on the animal form submitted to be fille dout correctly.
test("validates personality traits", () => {
  const animal = {
    id: "3",
    name: "Erica",
    species: "gorilla",
    diet: "omnivore",
    personalityTraits: ["quirky", "rash"],
  };

  const invalidAnimal = {
    id: "3",
    name: "Erica",
    species: "gorilla",
    diet: "omnivore",
  };

  const result = validateAnimal(animal);
  const result2 = validateAnimal(invalidAnimal);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});