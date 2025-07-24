const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    duration: {
      type: String,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Moderate", "Difficult"],
    },
    price: {
      type: String,
    },
    highlights: {
      type: [String],
      default: [],
    },
    state: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
    },
    numberOfPeople: {
      type: Number,
      min: 1,
    },
    category: {
      type: String,
      // enum: ["adventure", "cultural", "leisure", "wildlife", "religious"],
    },
    status: {
      type: String,
      enum: ["pending", "ongoing", "completed"],
      default: "pending",
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
