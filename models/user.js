const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { NotAuthorizedError } = require('../errors/errors');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'DB: field is not a valid email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

// иначе eslint ругается на безымянную функцию...
// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      const error = new NotAuthorizedError('Неправильные почта или пароль');
      if (!user) {
        return Promise.reject(error);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(error);
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
