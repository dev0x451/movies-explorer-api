const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require("../controllers/movies");

router.get("/", getMovies);

router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required().min(1).max(200),
      director: Joi.string().required().min(1).max(200),
      duration: Joi.number().required(),
      year: Joi.string().required().min(1).max(10),
      description: Joi.string().required().min(1).max(3000),
      image: Joi.string().required().uri(),
      trailerLink: Joi.string().required().uri(),
      thumbnail: Joi.string().required().uri(),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required().min(1).max(200),
      nameEN: Joi.string().required().min(1).max(200),
    }),
  }),
  createMovie
);

router.delete(
  "/:movieId",
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().required().length(24).hex(),
    }),
  }),
  deleteMovie
);

module.exports = router;
