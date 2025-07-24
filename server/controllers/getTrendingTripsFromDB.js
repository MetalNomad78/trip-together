const Trip = require('../models/tripsSchema');

const getTrendingTrips = async (req, res) => {
  try {
    const trendingTrips = await Trip.find({ status: { $ne: 'completed' } })
      .sort({ users: -1 }) // sort by number of users descending
      .populate('users', 'name') // optional: populate user names
      .populate('guide', 'name'); // optional: populate guide name

    res.code(200).send(trendingTrips);
  } catch (error) {
    console.error('Error fetching trending trips:', error);
    res.code(500).send({ error: 'Internal Server Error' });
  }
};

module.exports = getTrendingTrips;
