module.exports = {
  development: {
    username: "root",
    // password: process.env.DB_PASS,
    password: "password",
    database: "passport_demo",
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