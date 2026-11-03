const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const { PORT = 3000 } = process.env;

const app = express();
app.use("/", usersRouter);
app.use("/", cardsRouter);

mongoose.connect("mongodb://localhost:27017/aroundb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133", // pega el _id del usuario de prueba que creamos en el paso anterior
  };

  next();
});
