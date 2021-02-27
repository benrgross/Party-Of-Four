"use strict";

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert("Meals", [
      {
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: queryInterface => {
    return queryInterface.bulkDelete("Meals", null, {});
  }
};
