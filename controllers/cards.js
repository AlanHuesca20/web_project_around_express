const Card = require("../models/card");
const fs = require("fs");
const path = require("path");

const getCards = (req, res) => {
  const dataPath = path.join(__dirname, "..", "data", "cards.json");

  fs.readFile(dataPath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
      return;
    }
    res.json(JSON.parse(data));
  });
};

const createCard = (req, res) => {
  console.log(req.user._id);
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: "Error interno del servidor" });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.id)
    .orFail(() => handlerError())
    .then((card) => {
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: err.message });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res
          .status(500)
          .send({ message: err.message || "error interno del servidor" });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => handlerError())
    .then((card) => {
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: err.message });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res
          .status(500)
          .send({ message: err.message || "error interno del servidor" });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => handlerError())
    .then((card) => {
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: err.message });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res
          .status(500)
          .send({ message: err.message || "error interno del servidor" });
      }
    });
};

module.exports = {
  getCards,
  likeCard,
  createCard,
  deleteCard,
  dislikeCard,
};
