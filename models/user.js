const mongoose = require('mongoose');
const validators = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validete: {
      validators: (url) => validators.isURL(url),
      message: 'Не верный формат ссылки',
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
  },
  email: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validete: {
      validators: (email) => validators.isEmail(email),
      message: 'Введен не верный формат электронной почты',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

});

module.exports = mongoose.model('user', userSchema);
