const mongoose = require("mongoose");

const connectWithDb = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("DB connection established"))
    .catch((error) => {
      console.log("DB connection error: " + error);
      process.exit(1);
    });
};

module.exports = connectWithDb;
