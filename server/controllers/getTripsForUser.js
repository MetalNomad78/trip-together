const Trip = require('../models/tripsSchema');

async function getTripsForUser(req, res) {
  try {
    const { userId } = req.body;
    const trips = await Trip.find({ users: userId })
      .populate('guide', 'name email')
      .populate('users', 'name email')
      .exec();

    return res.status(200).send(trips);
  } catch (err) {
    console.error('Error fetching trips for user:', err);
    return res.status(200).send(err);
  }
}

module.exports = getTripsForUser;
