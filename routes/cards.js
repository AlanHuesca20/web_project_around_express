const cards = require("express").Router();
const {
  getCards,
  getCard,
  likeCard,
  createCard,
  deleteCard,
  dislikeCard,
} = require("../controllers/cards");

cards.get("/cards", getCards);
cards.get("/cards/:cardId", getCard);
cards.post("/cards", createCard);
cards.delete("/cards/:id", deleteCard);
cards.put("/cards/:id/likes", likeCard);
cards.delete("/cards/:id/likes", dislikeCard);

module.exports = cards;
