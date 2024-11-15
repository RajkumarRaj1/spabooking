const mongoose = require("mongoose");

const UserSchema =  new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 10,
      max: 20,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      default: "staff", //"staff","admin"
    },
    permission: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
