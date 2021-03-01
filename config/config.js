require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PASS,
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
    use_env_variable: "mysql://txq5e0fapw2s4khu:xq48v3fmasrp60yh@d6rii63wp64rsfb5.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/ki470gq65ly41s5", // eslint-disable-line
    dialect: "mysql"
  }
};
