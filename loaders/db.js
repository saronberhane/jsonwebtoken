const mongoose = require("mongoose");
const config = require("../config");

module.exports = () => {
  mongoose
    .connect(config.db.remote)
    .then((con) => {
      console.log("connected successfully");
    })
    .catch((error) => {
        console.log("Error has occured")
      console.error(error);
    });

  //check to see if the database is working
  const db_connection = mongoose.connection;

  db_connection.on("error", (error) => {
    console.log("There is an error");
    console.error(error);
  });

  db_connection.on("disconnected", () => {
    console.log("The database is disconnected");
  });
};
