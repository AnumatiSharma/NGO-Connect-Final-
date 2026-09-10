const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // =========================
    // BASIC INFORMATION
    // =========================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    // =========================
    // PROFILE INFORMATION
    // =========================

    address: {
      type: String,
      default: "",
      trim: true,
    },

    skills: {
      type: String,
      default: "",
      trim: true,
    },

    interests: {
      type: String,
      default: "",
      trim: true,
    },

    // =========================
    // ROLE
    // =========================

    role: {
      type: String,
      enum: [
        "volunteer",
        "coordinator",
        "admin",
      ],
      default: "volunteer",
    },

    // =========================
    // ACCOUNT STATUS
    // =========================

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "User",
  userSchema
);