"use strict";

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert("Users", [
      {
        email: "example@example.com",
        password: "dribble",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: "darrel@example.com",
        password: "poople",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: "parse@example.com",
        password: "dingus",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: queryInterface => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
