const users = require("express").Router();
const fs = require("fs");
const path = require("path");

const getUsers = (req, res) => {
  const dataPath = path.join(__dirname, "users.json");

  fs.readFile(dataPath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
  });

  res.writeHead(200, {
    "Content-Type": "text/html",
  });

  res
    .send(users)
    .catch(() => res.status(500).send({ message: "Error del servidor" }));
};

const getUser = (req, res) => {
  const { id } = req.params;

  if (!users[id]) {
    res.send({ error: `Este usuario no existe` });
    return;
  }

  res.send(users[id]);
};

users.get("/users", getUsers);
users.get("/users/:id", getUser);

module.exports = users;
