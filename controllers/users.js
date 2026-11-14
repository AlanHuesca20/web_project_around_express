const User = require('../models/user');

const ERROR_CODE = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const handlerError = () => {
  const error = new Error('Usuario no encontrado');
  error.name = 'NotFoundError';
  throw error;
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res
      .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
      .send({ message: 'Error interno del servidor' }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => handlerError())
    .then((user) => {
      res.status(200).send(user);
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

const createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.send(user))
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
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
