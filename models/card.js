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
    validete: {
      validators: (url) => validators.isURL(url),
      message: 'Не верный формат ссылки'
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'user'
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: []
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('card', cardSchema);