const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    require: true,
    type: String,


  },
});