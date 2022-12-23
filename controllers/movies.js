const Movie = require('../models/movie');
const {
  BAD_REQUEST_MESSAGE,
  CARD_NOT_FOUND_MESSAGE,
  STATUS_OK_CREATED,
  DELETION_NOT_AUTHORIZED_MESSAGE,
  STATUS_OK,
} = require('../util/constants');
const { NotFoundError, BadRequestError, ForbiddenError } = require('../errors/errors');

function getMovies(req, res, next) {
  Movie.find({})
    .populate(['owner'])
    .then((movies) => res.send(movies))
    .catch(next);
}

function createMovie(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => {
      Movie.findById(movie._id)
        .then((mve) => {
          res.status(STATUS_OK_CREATED).send(mve);
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') next(new BadRequestError(BAD_REQUEST_MESSAGE));
      else next(err);
    });
}

function deleteMovie(req, res, next) {
  const { movieId } = req.params;

  Movie.findOne({ _id: movieId })
    .orFail(() => {
      throw new NotFoundError(CARD_NOT_FOUND_MESSAGE);
    })
    .then((movie) => {
      if (req.user._id === movie.owner._id.toString()) {
        Movie.findByIdAndRemove(movieId)
          .then((movie2) => res.status(STATUS_OK).send(movie2))
          .catch((err) => {
            if (err.name === 'CastError') next(new BadRequestError(BAD_REQUEST_MESSAGE));
            else next(err);
          });
      } else next(new ForbiddenError(DELETION_NOT_AUTHORIZED_MESSAGE));
    })
    .catch(next);
}

module.exports = {
  getMovies, createMovie, deleteMovie,
};
