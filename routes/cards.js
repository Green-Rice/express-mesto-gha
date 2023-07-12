const router = require('express').Router();
const {} = require('../controllers/cards');

router.get('/cards', getCards)
router.get('/cards/:cardId', getCardId)
router.post('/cards', createNewCard)

