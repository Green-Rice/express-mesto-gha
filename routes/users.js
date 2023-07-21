const router = require('express').Router();

const {
  getUsers,
  getUserId,
  createNewUser,
  updateUser,
  updateAvatar,
  login,
} = require('../controllers/users');

router.post('/signup', createNewUser);
router.get('/', getUsers);
router.get('/:userId', getUserId);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);
router.post('/signin', login);

module.exports = router;
