require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    // password: process.env.DB_PASS,
    password: "Welcome1",
    database: "pipe_db",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    use_env_variable: "JAWSDB_URL", // eslint-disable-line
    dialect: "mysql"
  }
};
