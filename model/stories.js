const mongoose = require("mongoose");
const User = require("../model/user");

const storiesSchema = new mongoose.Schema({
  bookmark: {
    type: Boolean,
    default: false,
  },

  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  slides: [
    {
      heading: {
        type: String,
        required: [true, "please provide your heading"],
      },
      description: {
        type: String,
        required: [true],
      },
      image: {
        url: String,
      },
      like: {
        type: Number,
        default: 0,
      },
      category: {
        type: String,
        required: true,
        set: (v) => v.trim(),
      },
    },
  ],
});

module.exports = mongoose.model("Stories", storiesSchema);
