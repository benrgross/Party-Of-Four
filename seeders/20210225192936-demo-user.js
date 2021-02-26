"use strict";

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "John",
        lastName: "Doe",
        email: "example@example.com",
        password: "dribble",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Darrel",
        lastName: "Dimple",
        email: "darrel@example.com",
        password: "poople",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Parsnip",
        lastName: "Dalloway",
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
