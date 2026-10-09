const user = require('express').Router();
const { users } = require('./users.json');

user.get('/users', (req, res) => {
  res.send(users);
});

user.get('/users/:id', (req, res) => {
  const { id } = req.params;

  if (!users[id]) {
    res.send({ error: `Este usuario no existe` });
    return;
  }

  res.send(users[id]);
});

module.exports = user;
