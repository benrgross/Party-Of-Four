"use strict";

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert("Meals", [
      {
        date: 2242021,
        time: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        date: 2232021,
        time: 16,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        date: 2222021,
        time: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: queryInterface => {
    return queryInterface.bulkDelete("Meals", null, {});
  }
};
