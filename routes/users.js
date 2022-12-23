const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserById, updateUser,
} = require('../controllers/users');

router.get('/me', getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

module.exports = router;
