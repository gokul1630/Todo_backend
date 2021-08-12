const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  user: { type: String, required: true },
  password: { type: String, required: true },
  todoList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

UserSchema.methods.getToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });
};
UserSchema.methods.checkPassword = function (password) {
  return password === this.password;
};

module.exports = mongoose.model("User", UserSchema);
