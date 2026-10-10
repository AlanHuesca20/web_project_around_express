const cards = require("express").Router();
const fs = require("fs");
const path = require("path");

const getCards = (req, res) => {
  const dataPath = path.join(__dirname, "cards.json");

  fs.readFile(dataPath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
  });

  res.writeHead(200, {
    "Content-Type": "text/html",
  });

  res.send(cards);
};

cards.get("/cards", getCards);

module.exports = cards;
