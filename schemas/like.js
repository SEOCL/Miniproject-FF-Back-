const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  articleNum: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Like", likeSchema);
