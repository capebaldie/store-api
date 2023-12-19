const mongoose = require("mongoose");

// seperating ,this can also written as new mongoose.schema({})
const Schema = mongoose.Schema;

// Defining a new mongoose schema
const productTaskSchema = new Schema({
  name: {
    type: String,
    required: [true, "a valid name is required"],
    trim: true, // for trimming white spaces
    maxLength: [40, "cannot be more than 40 chars"],
  },
  price: {
    type: Number,
    required: [true, "a valid price should provide"],
    trim: true, // for trimming white spaces
  },
  featured: {
    type: Boolean,
    default: false, // providing a default value of false
  },
  rating: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(), // gives the current date
  },
  company: {
    type: String,
    // enum restricts the items that can be entered onto this field (in this case company)
    // only the values specified in the enum can be entered (those specified in brackets)
    // enum: ["ikea", "liddy", "caressa", "marcos"],
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      //error message if user enters any other values
      message: "{VALUE} is not in the provided list",
    },
  },
});

// Create a Mongoose model based on the schema
const ProductModel = mongoose.model("product", productTaskSchema);

module.exports = ProductModel;
