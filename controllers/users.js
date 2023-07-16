const User = require('../models/user')


const getUserId = (req, res) => {
  const { user_Id } = req.params;
  User.findById(user_Id)
    .then(user => res.send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}


const getUsers = (_req, res) => {
  User.find({})
    .then(Users => res.send(Users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}



const createNewUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};


const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true})
  .then(user => res.status(200).send({ name: user.name, about: user.about }))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, {avatar }, { new: true, runValidators: true})
  .then(user => res.status(200).send({ avatar: user.avatar}))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}


module.exports = { getUsers, getUserId, createNewUser, updateUser, updateAvatar}
