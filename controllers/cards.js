const Card = require('../models/card');

const getCars = (_req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка сервера' }));
};

const createNewCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Передали не валидные данные в форму' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка сервера' });
    });
};

const deleteCardById = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена!' });
      } else {
        res.status(200).send(card);
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({ message: 'Введены не верные данные id карточки' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка сервера' });
    });
};

const setLikesCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        res.status(404).send({ message: 'Карточкане не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Карточкане не найдена' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Введены не верные данные id карточки' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка сервера' });
    });
};

const removeLikesCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточкане не найдена' });
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Введены не верные данные id карточки' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка сервера' });
    });
};

module.exports = {
  getCars, createNewCard, deleteCardById, setLikesCard, removeLikesCard,
};
