const User = require('../models/UserModel');
const Todo = require('../models/TodoModel');

const post_new_user = async (req, res) => {
  const { user, password } = req.body;
  let data = await User.create({ user, password });
  res.json(data);
};
const delete_delete_user = async (req, res) => {
  const { userId } = req.body;
  let user = await User.findByIdAndDelete(userId);
  let todo = await Todo.find({ userId });
  if (user || todo) {
    todo.forEach((documents) => documents.remove());
    res.json('user deleted');
  } else {
    res.json('something wentt wrong');
  }
};

module.exports = {
  post_new_user,
  delete_delete_user,
};
