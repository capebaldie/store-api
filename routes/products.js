const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getAllProductsTest,
} = require("../controllers/products");

// router.get("/", getAllProducts);
router.route("/").get(getAllProducts);

// router.get("/test", getAllProductsTest);
router.route("/test").get(getAllProductsTest);

module.exports = router;
