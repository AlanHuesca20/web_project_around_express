const cards = require("express").Router();
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

cards.get("/cards", getCards);

module.exports = cards;
