const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const routerUser = require('./routes/users');
const routerCard = require('./routes/cards');
const {celebrate, Joi} = require('celebrate');
const { login, createNewUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.use(bodyParser.json());

  // app.use((req, _res, next) => {
  //   req.user = {
  //     _id: '64b2de316e9b6d425100f594', // вставьте сюда _id созданного в предыдущем пункте пользователя
  //   };

  //   next();
  // });

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/https?:\/\/(www\.)?[-\w@:%\.\+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-\w()@:%\.\+~#=//?&]*)/i),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  })
}), createNewUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  })
}), login);

app.use( auth );


app.use('/cards', routerCard);
app.use('/users', routerUser);

app.use('/*', (_req, res, next) => {
  res.status(404).send({ message: 'Запрашиваемая страница не найдена!' });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
