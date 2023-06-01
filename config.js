const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

module.exports = {
  env: process.env.NODE_ENV,
  db: {
    remote: process.env.DB_REMOTE,
  },
  //secret key
  jwt: process.env.SECRET,
  //time when it will expire 
  expiresIn: process.env.EXPIRESIN
};
