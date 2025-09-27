const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB(params) {
  try {
    await mongoose.connect(process.env.mongouri, {
      dbName: process.env.dbName,
    });
    console.log("connected with " + process.env.dbName + " database");
  } catch (error) {}
}

module.exports = { connectDB };
