const mongoose = require('mongoose');
const urlMessage = 'El campo {PATH} debe ser una URL válida.';

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  pronouns: {
    type: String,
    enum: ['elle', 'ella', 'él', 'otro pronombre'],
  },
  link: {
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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
  type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  default: [],
},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
