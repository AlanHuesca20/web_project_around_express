const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const bodyParser = require("body-parser");
const app = express();

const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/aroundb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const errorHandler = (req, res, next) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
};

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133", // pega el _id del usuario de prueba que creamos en el paso anterior
  };

  next();
});
app.use("/", usersRouter);
app.use("/", cardsRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});
