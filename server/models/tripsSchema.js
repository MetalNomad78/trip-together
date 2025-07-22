const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    state: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "ongoing", "completed"],
      default: "pending",
    },
    city: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
    },
    numberOfPeople: {
      type: Number,
      required: true,
      min: 1,
    },
    guide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guide",
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

const Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;
