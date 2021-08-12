const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = Schema({
  todo: { type: String },
  description: { type: String },
  pending: { type: Boolean },
  onGoing: { type: Boolean },
  testing: { type: Boolean },
  completed: { type: Boolean },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
