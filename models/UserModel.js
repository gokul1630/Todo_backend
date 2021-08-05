const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  user: { type: String, required: true },
  password: { type: String, required: true },
  todoList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Todo',
    },
  ],
});

module.exports = mongoose.model('User', UserSchema);
