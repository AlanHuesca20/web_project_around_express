const cards = require('express').Router();
const {
  getCards,
  getCard,
  likeCard,
  createCard,
  deleteCard,
  dislikeCard,
} = require('../controllers/cards');

cards.get('/cards', getCards);
cards.get('/cards/:cardId', getCard);
cards.post('/cards', createCard);
cards.delete('/cards/:cardId', deleteCard);
cards.put('/cards/:cardId/likes', likeCard);
cards.delete('/cards/:cardId/likes', dislikeCard);

module.exports = cards;
