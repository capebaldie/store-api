const ProductModel = require("../models/product");

const getAllProducts = async (req, res) => {
  // for bringing all products from database we use find
  const queryItems = {};
  const { name, company, featured, sort, select } = req.query;

  if (featured) {
    queryItems.featured = featured;
  }
  // if there is anything in the query(here company), display output based on that query else display complete data
  if (company) {
    queryItems.company = { $regex: company, $options: "i" };
  }
  // $regex is an operator in MongoDB that allows you to search for documents that match a specific pattern.
  // ex : search for letter 'a' and it returns all items that has the letter 'a'
  // options 'i' is passing for not become case sensitive treat a and A same
  if (name) {
    queryItems.name = { $regex: name, $options: "i" };
  }

  console.log(queryItems);
  // sort for sorting items asc or des way.
  const products = ProductModel.find(queryItems);
  // if there is anything in the sort query add it to products
  if (sort) {
    // aggregate.sort('field -test') sort items should be seperated using spaces
    // split items and join the sort query ex: 'price,name' res:'price name'
    // can also use %20 as space
    const sortItems = sort.split(",").join(" ");
    products.sort(sortItems);
  }
  // select is used to only show items specified in select method, it operates same as sort method so logic is same
  if (select) {
    selectItems = select.split(",").join(" ");
    products.select(selectItems);
  }

  //pagination logic
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * limit;

  console.log(req.query);
  // and then await for the results
  const result = await products.limit(limit).skip(skip);
  // display data as results for the request
  res.status(200).json({ result });
};

const getAllProductsTest = async (req, res) => {
  let products;
  const { filter } = req.query;
  const filterItem = filter.split(" ");
  const num = Number(filterItem.pop());
  console.log(filter);
  if (filterItem.includes(">")) {
    products = await ProductModel.find({}).where(filterItem[0]).gt(num);
  } else if (filterItem.includes("<")) {
    products = await ProductModel.find({}).where(filterItem[0]).lt(num);
  }

  res.status(200).json(products);
};

module.exports = { getAllProducts, getAllProductsTest };
