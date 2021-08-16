const { signUpService, signInService } = require('../services/UserServices')

const loginUser = async (req, res, next) => {
  const { user, password } = req.body

  if (!user || !password) {
    res.status(403).send({
      message: 'Please provide email and password',
    })
  }
  try {
    const signIn = await signInService(user)
    if (signIn) {
      const match = signIn.checkPassword(password)
      if (!match) {
        res.status(403).send({ message: "Password doesn't match" })
      }
      let token = signIn.getToken()
      res.status(200).json({ token: token })
    } else {
      res.status(403).send({ message: "Email isn't registred yet" })
    }
  } catch (error) {
    res.status(403).send(error)
  }
}

const signUpUser = async (req, res) => {
  const { user, password } = req.body
  try {
    let signUp = await signUpService(user, password)
    let token = signUp.getToken()
    res.json({ token: token, user: signUp })
  } catch (error) {
    res.statusCode(403).send(error.message)
  }
}

const me = async (req, res) => {
  const data = req.user
  res.json(data)
}

module.exports = {
  loginUser,
  me,
  signUpUser,
}
