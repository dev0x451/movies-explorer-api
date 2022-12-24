require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { errors } = require('celebrate');
const { log } = require('console');

const userRoutes = require('./routes/users');
const movieRoutes = require('./routes/movies');
const signinRoute = require('./routes/signin');
const signoutRoute = require('./routes/signout');
const signupRoute = require('./routes/signup');
const invalidRoutes = require('./routes/invalidURLs');
const { handleAllErrors } = require('./errors/errors');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  PORT = 3000,
  MONGODB_URI = 'mongodb://localhost:27017/moviesdb',
} = process.env;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URI, {
  autoIndex: true,
});

const options = {
  origin: [
    'https://localhost:3000',
  ],
  credentials: true,
};

app.use('*', cors(options));
app.use(limiter);
app.use(requestLogger); // подключаем логгер запросов
app.use(helmet());
app.use(cookieParser());
app.use(express.json()); // instead of body parser
app.use('/signin', signinRoute);
app.use('/signup', signupRoute);
app.use(auth);
app.use('/users', userRoutes);
app.use('/movies', movieRoutes);
app.use('/signout', signoutRoute);
app.use('*', invalidRoutes);
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use(handleAllErrors);

app.listen(PORT, () => {
  log(`App listening on port ${PORT}`);
});
