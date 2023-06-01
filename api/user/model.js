const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an email"],
      maxlength: [100, "Email can not exceed 100 characters"],
      minlength: [1, "Email can not be less than 1 character"],
    },

    password: {
      type: String,
      required: [true, "Please provide a password"],
      maxlength: [100, "password can not exceed 100 characters"],
      minlength: [5, "password can not be less than 5 character"],
    },

    firstName: {
      type: String,
      required: [true, "Please provide your first name"],
      maxlength: [100, "First name can not exceed 100 characters"],
      minlength: [2, "First name can not be less than 2 character"],
    },

    lastName: {
      type: String,
      required: [true, "Please provide your last name"],
      maxlength: [100, "Last name can not exceed 100 characters"],
      minlength: [2, "Last name can not be less than 2 character"],
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
