const users = require("express").Router();
const fs = require("fs");
const path = require("path");

const getUsers = (req, res) => {
  const dataPath = path.join(__dirname, "..", "data", "users.json");

  fs.readFile(dataPath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
      return;
    }
    res.json(JSON.parse(data));
  });
};

const getUser = (req, res) => {
  const dataPath = path.join(__dirname, "..", "data", "users.json");

  fs.readFile(dataPath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
      return;
    }
    const user = JSON.parse(data).find((item) => item._id === req.params.id);
    if (!user) {
      res.status(404).json({ message: "ID de usuario no encontrado" });
      return;
    }
    res.json(user);
  });
};

users.get("/users", getUsers);
users.get("/users/:id", getUser);

module.exports = users;
