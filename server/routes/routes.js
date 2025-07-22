const schema = require("../config/schema.json");
const getTrendingTrips = require("../controllers/getTrendingTripsFromDB.js");
const {
  userSignup,
  userLogin,
} = require("../controllers/loginSignupController.js");
async function routes(fastify) {
  fastify.post(
    schema.dataBaseApis["getTripsFromDB"].schema.url,
    schema.dataBaseApis["getTripsFromDB"],
    getTrendingTrips,
  );
  fastify.post(
    schema.dataBaseApis["userSignup"].schema.url,
    schema.dataBaseApis["userSignup"],
    userSignup,
  );
  fastify.post(
    schema.dataBaseApis["userLogin"].schema.url,
    schema.dataBaseApis["userLogin"],
    userLogin,
  );
}

module.exports = routes;
