const card = require('express').Router();
const { cards } = require('./cards.json');

card.get('/cards', (req, res) => {
  res.send(cards);
}); 

module.exports = cards;
