const Trip = require("../models/tripsSchema");

const getTrendingTrips = async (req, res) => {
  const trips = await Trip.find({ status: { $ne: "completed" } });

  res.code(200).send(trips);
};

module.exports = getTrendingTrips;
