const router = require('express').Router();

const {
  getUsers,
  getUserId,
  updateUser,
  updateAvatar,
  actualUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserId);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);
router.get('/me', actualUser);

module.exports = router;
