const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userPw: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userProfile: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
