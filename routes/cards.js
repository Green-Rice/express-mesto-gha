const router = require('express').Router();
const {
  getCars, createNewCard, deleteCardById, setLikesCard, removeLikesCard,
} = require('../controllers/cards');

router.post('/', createNewCard);
router.get('/', getCars);
router.delete('/:cardId', deleteCardById);
router.put('/:cardId/likes', setLikesCard);
router.delete('/:cardId/likes', removeLikesCard);

module.exports = router;
