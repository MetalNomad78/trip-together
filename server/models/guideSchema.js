const mongoose = require("mongoose");

const guideSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  assignedTrips: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
    },
  ],
});

const Guide = mongoose.model("Guide", guideSchema);
module.exports = Guide;
