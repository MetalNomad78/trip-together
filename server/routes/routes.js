const schema = require("../config/schema.json");
const getTrendingTrips = require("../controllers/getTrendingTripsFromDB.js");
const createTrip = require("../controllers/createTrip.js");
const getTripsForUser = require("../controllers/getTripsForUser.js");
const getUsersForTrip = require("../controllers/getUsersForTrip.js");
const getTripsForGuide = require("../controllers/getTripsForGuide.js");
const getTripDetails = require("../controllers/getTripDetails.js");

const {
  userSignup,
  userLogin,
} = require("../controllers/loginSignupController.js");
const {
  guideSignup,
  guideLogin,
} = require("../controllers/guideLoginSignup.js");
async function routes(fastify) {
  fastify.post(
    schema.dataBaseApis["createTrip"].schema.url,
    schema.dataBaseApis["createTrip"],
    createTrip,
  );
  fastify.post(
    schema.dataBaseApis["getTripsForGuide"].schema.url,
    schema.dataBaseApis["getTripsForGuide"],
    getTripsForGuide,
  );
  fastify.post(
    schema.dataBaseApis["getTripDetails"].schema.url,
    schema.dataBaseApis["getTripDetails"],
    getTripDetails,
  );
  fastify.post(
    schema.dataBaseApis["getTripsForUser"].schema.url,
    schema.dataBaseApis["getTripsForUser"],
    getTripsForUser,
  );
  fastify.post(
    schema.dataBaseApis["getUsersForTrip"].schema.url,
    schema.dataBaseApis["getUsersForTrip"],
    getUsersForTrip,
  );
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
  -fastify.post(
    schema.dataBaseApis["guideSignup"].schema.url,
    schema.dataBaseApis["guideSignup"],
    guideSignup,
  );
  fastify.post(
    schema.dataBaseApis["guideLogin"].schema.url,
    schema.dataBaseApis["guideLogin"],
    guideLogin,
  );
}

module.exports = routes;
