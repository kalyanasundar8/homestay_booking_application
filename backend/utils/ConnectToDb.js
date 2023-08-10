const mongoose = require("mongoose");

const connectToDb = async () => {
  const dbUri = process.env.MONGO_URI;

  try {
    mongoose.connect(dbUri);
    console.log(`Server connected to DB`.yellow);
  } catch (error) {
    process.exit(1);
  }
};

module.exports = connectToDb;
