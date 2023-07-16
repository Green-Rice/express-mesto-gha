const Card = require('../models/card');

const getCars = (req, res) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

const createNewCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user_id })
    .then(card => res.status(201).send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

const deleteCardById = (req, res) => {
  const { card_Id } = req.params;
  Card.findByIdAndRemove(card_Id)
    .then(card => {
      res.status(200).send(card)
      console.log(`удалили карточку с id: ${card_Id}`)
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

const setLikesCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.card_Id,
    { $addToSet: { likes: req.user._id } }, { new: true })
    .then(card => res.status(200).send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

const removeLikesCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.card_Id,
    { $pull: { likes: req.user._id } }, { new: true })
    .then(card => res.status(200).send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}


module.exports = { getCars, createNewCard, deleteCardById, setLikesCard, removeLikesCard };