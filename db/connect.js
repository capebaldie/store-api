const mongoose = require("mongoose");

// func to connect the db the url is getting from mongodb and it is protected in the .env
const connectDB = (url) => {
  return mongoose
    .connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connection Success");
    });
};

module.exports = connectDB;
