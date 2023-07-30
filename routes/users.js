const router = require('express').Router();

const {
  getUsers,
  getUserId,
  createNewUser,
  updateUser,
  updateAvatar,
  login,
  actualUser,
} = require('../controllers/users');

router.post('/signup', createNewUser);
router.get('/', getUsers);
router.get('/:userId', getUserId);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);
router.post('/signin', login);
router.get('/me', actualUser);

module.exports = router;
