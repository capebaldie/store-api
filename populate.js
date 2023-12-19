require("dotenv").config();
const connectDb = require("./db/connect");
const productList = require("./products.json");
const productModel = require("./models/product");

const startServer = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    // deleting already existing data from the database to start afresh
    await productModel.deleteMany();
    // adding new data into database in bulk
    await productModel.create(productList);
    console.log(`listening on port`);
    // this termination is doing to avoid running this continuosly
    process.exit(0); // forcefully terminating a node process 0 intcates success termination
  } catch (error) {
    console.log(error);
    process.exit(1); // 1 indicates exiting with an error
  }
};

startServer();
