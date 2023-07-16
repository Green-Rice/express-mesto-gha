const router = require('express').Router();
const { getCars, createNewCard, deleteCardById, setLikesCard, removeLikesCard } = require('../controllers/cards');

router.post('/', createNewCard)
router.get('/', getCars)
router.delete('/:card_Id', deleteCardById)
router.put('/:card_Id/likes', setLikesCard)
router.delete('/:card_Id/likes', removeLikesCard)

module.exports = router;