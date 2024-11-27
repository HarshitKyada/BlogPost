const mongoose = require("mongoose");

const ownerProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  uniqueId: {
    type: String,
  },
  token: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const OwnerProfile =
  mongoose.models.OwnerProfile ||
  mongoose.model("OwnerProfile", ownerProfileSchema);

module.exports = OwnerProfile;
