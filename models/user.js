const mongoose = require("mongoose");
const urlMessage = "El campo {PATH} debe ser una URL válida.";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) =>
        /^(https?:\/\/)([\w\-_]+\.)+[\w\-_]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/.test(
          v,
        ),
      message: urlMessage,
    },
  },
});

module.exports = mongoose.model("user", userSchema);
