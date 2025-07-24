const Trip = require('../models/tripsSchema.js');

const getTripDetails = async (req, res) => {
  try {
    const { tripId } = req.body;
    const trip = await Trip.findById(tripId).populate('guide').populate('users').exec();

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found',
      });
    }

    return res.code(200).send({
      success: true,
      data: trip,
    });
  } catch (err) {
    console.error('Error fetching trip details:', err);
    return res.code(200).send({
      success: false,
      error: 'Server error while fetching trip details',
    });
  }
};

module.exports = getTripDetails;
