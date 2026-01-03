const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  vehicleNumber: { type: String }, // Optional for Admin
  vehicleType: { type: String },   // Optional for Admin
  phone: { type: String },         // Optional for Admin
  expiresAt: { type: Date },       // Account expiration (for temp Admins)
  // admin or user
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

module.exports = mongoose.model("User", UserSchema);