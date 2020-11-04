const mongoose = require("mongoose");

const formSchema = mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    hobby: {
      type: String,
      required: true,
    },
    sport: {
      type: [String],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("form", formSchema);
