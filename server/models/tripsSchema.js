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
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return !this.startDate || value > this.startDate;
        },
        message: "End date must be after start date",
      },
    },
  },
  { timestamps: true },
);

const Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;
