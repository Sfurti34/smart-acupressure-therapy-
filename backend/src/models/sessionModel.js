const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    mode: {
      type: String,
      required: true,
      enum: [
  "relax",
  "stress",
  "sleep",
  "neck",
  "back",
  "custom",
],
    },

    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },

    startTime: {
      type: Date,
      default: Date.now,
    },

    endTime: {
      type: Date,
    },

    duration: {
      type: Number,
      default: 0,
    },

    feedback: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Session", sessionSchema);