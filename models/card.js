const mongoose = require('mongoose');
const validators = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    require: true,
    validate: validators.isURL(),
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('card', cardSchema);