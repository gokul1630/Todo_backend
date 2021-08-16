const User = require("../models/UserModel");
const Todo = require("../models/TodoModel");
const {
  SignUpService,
  SignInService,
  DeleteUser,
} = require("../services/UserServices");
const { DeleteTodo } = require("../services/TodoServices");

const loginUser = async (req, res, next) => {
  const { user, password } = req.body;

  if (!user || !password) {
    res.status(403).send({
      message: "Please provide email and password",
    });
  }
  try {
    const signInService = await SignInService(user);
    if (signInService) {
      const match = signInService.checkPassword(password);
      if (!match) {
        res.status(403).send({ message: "Password doesn't match" });
      }
      let token = signInService.getToken();
      res.status(200).json({ token: token });
    } else {
      res.status(403).send({ message: "Email isn't registred yet" });
    }
  } catch (error) {
    res.status(403).send(error);
  }
};

const signUpUser = async (req, res) => {
  const { user, password } = req.body;
  try {
    let signUp = await signUpService(user, password);
    let token = signUp.getToken();
    res.json({ token: token, user: signUp });
  } catch (error) {
    res.statusCode(403).send(error.message);
  }
};

const me = async (req, res) => {
  const data = req.user;
  res.json(data);
};

const deleteUser = async (req, res) => {
  const { userId } = req.body;
  let user = await DeleteUser(userId);
  let todo = await DeleteTodo(userId);

  if (user || todo) {
    todo.forEach((documents) => documents.remove());
    res.json("user deleted");
  } else {
    res.status(403).send({ message: "something went wrong" });
  }
};

module.exports = {
  loginUser,
  me,
  signUpUser,
  deleteUser,
};
