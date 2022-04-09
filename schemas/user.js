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
  },
});

module.exports = mongoose.model("User", userSchema);
