const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: Array,
    },
    orders: {
      type: Array,
    },
    cardInfo: {
      type: Array,
    },
    savedForLater: {
      type: Array,
    },
    cart: {
      type: Array,
    },
  },
  {
    collection: "users",
  }
);

userSchema.plugin(uniqueValidator, { message: "Email already exist" });
module.exports = mongoose.model("User", userSchema);
