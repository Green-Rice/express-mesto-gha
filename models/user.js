const mongoose = require('mongoose');
const validators = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    require: true,
    validete: {
      validators: (url) => validators.isURL(url),
      message: 'Не верный формат ссылки'
    }
  }

});

module.exports = mongoose.model('user', userSchema);