const User = require("../models/user");
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

const createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: "Error del servidor" }));
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .orFail(() => handlerError())
    .then((user) => {
      res.send(user);
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

const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => handlerError())
    .then((user) => {
      res.send(user);
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
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
