const User = require('../models/user')

const getUsers = (_req, res) => {
  User.find({})
    .then(Users => res.status(200).send(Users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка сервера' }));
}

const getUserId = (req, res) => {
  const { user_Id } = req.params;
  User.findById(user_Id)
    .then((user) => {
      if(user){
        res.status(200).send(user)
      }else {
        res.status(404).send(`Пользователь с id: ${user_Id} не найден`)
      }
     })
     .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: `Пользователь с id: ${user_Id} не найден` })
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: `Введены не верные данные id пользователя` })
      }
      res.status(500).send({ message: 'Произошла ошибка сервера' })
    });
}

const createNewUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Передали не валидные данные в форму' });
      }
      res.status(500).send({ message: 'Произошла ошибка сервера' })
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true})
  .then((user) => {
    if(user) {
      res.status(201).send({ name: user.name, about: user.about })
    }else {
      res.status(404).send(`Пользователь с id: ${req.user._id} не найден`)
    }
  })
  .catch((err) => {
    if (err.name === 'DocumentNotFoundError') {
      return res.status(404).send({ message: `Пользователь с id: ${user_Id} не найден` })
    }
    if(err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Передали не валидные данные в форму' });
    }
    if (err.name === 'CastError') {
      return res.status(400).send({ message: `Введены не верные данные id пользователя` })
    }
    res.status(500).send({ message: 'Произошла ошибка сервера' })
  });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, {avatar }, { new: true, runValidators: true})
  .then((user) => {
    if(user) {
    res.status(201).send({ avatar: user.avatar})
  }else {
    res.status(404).send(`Пользователь с id: ${req.user._id} не найден`)
  }})
  .catch((err) => {
    if (err.name === 'DocumentNotFoundError') {
      return res.status(404).send({ message: `Пользователь с id: ${user_Id} не найден` })
    }
    if(err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Передали не валидные данные в форму' });
    }
    if (err.name === 'CastError') {
      return res.status(400).send({ message: `Введены не верные данные id пользователя` })
    }
    res.status(500).send({ message: 'Произошла ошибка сервера' })
  });
}

module.exports = { getUsers, getUserId, createNewUser, updateUser, updateAvatar}