const schema = require("../config/schema.json");
const getTrendingTrips = require("../controllers/getTrendingTripsFromDB.js");

async function routes(fastify) {
  fastify.post(
    schema.dataBaseApis["getTripsFromDB"].schema.url,
    schema.dataBaseApis["getTripsFromDB"],
    getTrendingTrips,
  );
}

module.exports = routes;
