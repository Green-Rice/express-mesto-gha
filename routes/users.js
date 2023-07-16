const router = require('express').Router();

const { getUsers, getUserId, createNewUser, updateUser, updateAvatar } = require('../controllers/users');

router.post('/', createNewUser)
router.get('/', getUsers)
router.get('/:user_Id', getUserId)
router.patch('/me', updateUser)
router.patch('/me/avatar', updateAvatar)


module.exports = router;