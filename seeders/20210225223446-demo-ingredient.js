"use strict";

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert("Ingredients", [
      {
        name: "cheese",
        inflammatory: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "celery",
        inflammatory: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "chicken",
        inflammatory: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: queryInterface => {
    return queryInterface.bulkDelete("Ingredients", null, {});
  }
};
