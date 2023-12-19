// error handling for routes that are not defined in routes

const notFound = (req, res) => res.status(404).send("Route does not exist");

module.exports = notFound;
