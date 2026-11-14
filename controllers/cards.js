const Card = require('../models/card');

const ERROR_CODE = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const handlerError = () => {
  const error = new Error('Card not found');
  error.name = 'NotFoundError';
  throw error;
};

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res
      .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
      .send({ message: 'Error interno del servidor' }));
};

const getCard = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail(() => handlerError())
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE.BAD_REQUEST).send({ message: err.message });
      } else if (err.name === 'NotFoundError') {
        res.status(ERROR_CODE.NOT_FOUND).send({ message: err.message });
      } else {
        res
          .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
          .send({ message: 'Error interno del servidor' });
      }
    });
};

const createCard = (req, res) => {
  console.log(req.user._id);
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE.BAD_REQUEST).send({ message: err.message });
      } else {
        res
          .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
          .send({ message: 'Error interno del servidor' });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => handlerError())
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE.BAD_REQUEST).send({ message: err.message });
      } else if (err.name === 'NotFoundError') {
        res.status(ERROR_CODE.NOT_FOUND).send({ message: err.message });
      } else {
        res
          .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
          .send({ message: 'Error interno del servidor' });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => handlerError())
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE.BAD_REQUEST).send({ message: err.message });
      } else if (err.name === 'NotFoundError') {
        res.status(ERROR_CODE.NOT_FOUND).send({ message: err.message });
      } else {
        res
          .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
          .send({ message: 'Error interno del servidor' });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => handlerError())
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE.BAD_REQUEST).send({ message: err.message });
      } else if (err.name === 'NotFoundError') {
        res.status(ERROR_CODE.NOT_FOUND).send({ message: err.message });
      } else {
        res
          .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
          .send({ message: 'Error interno del servidor' });
      }
    });
};

module.exports = {
  getCards,
  getCard,
  likeCard,
  createCard,
  deleteCard,
  dislikeCard,
};
