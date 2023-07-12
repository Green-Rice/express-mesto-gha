const User = require('../models/user')

const getUsers = (req, res) => {
  User.find({})
    .then(Users => res.send({ data: Users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

const getUserId = (req, res) => {
  const { _id } = req.body;//install bodyParser*
  User.find({ _id })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

const createNewUser = (req, res) => {
  const { name, about, avatar } = req.body
  User.create({ name, about, avatar })
    .then(newUser => res.send({data: newUser}))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

const updateUser = (req, res) => {

}

const updateAvatar = (req, res) => {

}


module.exports = { getUsers, getUserId, createNewUser, updateUser, updateAvatar }