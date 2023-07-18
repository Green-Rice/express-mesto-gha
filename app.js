const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const routerUser = require('./routes/users');
const routerCard = require('./routes/cards');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.use(bodyParser.json());

app.use((req, _res, next) => {
  req.user = {
    _id: '64b2de316e9b6d425100f594', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/cards', routerCard);
app.use('/users', routerUser);

app.get('*', (_req, res, next) => {
  res.status(404).send({ message: 'Запрашиваемая страница не найдена!' });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
