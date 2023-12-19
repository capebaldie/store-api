require("dotenv").config();
const express = require("express");
//error handler
require("express-async-errors");
const app = express();
const notFoundMiddleWare = require("./middleware/not-found");
const connectDB = require("./db/connect");
const products = require("./routes/products");

const port = process.env.PORT || 4000;

//middleware
// extended: true option allows for parsing complex objects and arrays.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// default main route (this will always stays the same)
app.use("/api/v1/products", products);
app.use(notFoundMiddleWare);

// console.log("04 Store API");

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
