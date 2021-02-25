"use strict";

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert("Ingredients", [
      {
        name: "Cheese",
        inflammatory: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Celery",
        inflammatory: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Chicken",
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
