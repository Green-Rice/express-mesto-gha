const router = require('express').Router();
const User = require('../models/user');

router.get('/users', (req, res) => {
  User.find({})
    .then(User => res.send( {data: users}))
    .cathe()
})
