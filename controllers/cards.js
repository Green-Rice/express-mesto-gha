const Card = require('../models/card');

const getCars = (_req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка сервера' }));
};

const createNewCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user_id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Передали не валидные данные в форму' });
      }
      res.status(500).send({ message: 'Произошла ошибка сервера' });
    });
};

const deleteCardById = (req, res) => {
  const { card_Id } = req.params;
  Card.findByIdAndRemove(card_Id)
    .then((card) => {
      if (card) {
        res.status(201).send(card);
        console.log(`удалили карточку с id: ${card_Id}`);
      } else {
        res.status(404).send(`Карточка с id: ${card_Id} не найдена`);
      }
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: `Карточка с id: ${card_Id} не найдена` });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Введены не верные данные id карточки' });
      }
      res.status(500).send({ message: 'Произошла ошибка сервера' });
    });
};

const setLikesCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.card_Id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(201).send(card);
      } else {
        res.status(404).send(`Карточка с id: ${card_Id} не найдена`);
      }
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: `Карточка с id: ${card_Id} не найдена` });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Введены не верные данные id карточки' });
      }
      res.status(500).send({ message: 'Произошла ошибка сервера' });
    });
};

const removeLikesCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.card_Id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(201).send(card);
      } else {
        res.status(404).send(`Карточка с id: ${card_Id} не найдена`);
      }
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: `Карточка с id: ${card_Id} не найдена` });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Введены не верные данные id карточки' });
      }
      res.status(500).send({ message: 'Произошла ошибка сервера' });
    });
};

module.exports = {
  getCars, createNewCard, deleteCardById, setLikesCard, removeLikesCard,
};
