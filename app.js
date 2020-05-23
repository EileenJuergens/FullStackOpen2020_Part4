const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const blogsRouter = require('./controllers/blogs');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');


logger.info('connecting to ', config.MONGODB_URI);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose.connect(config.MONGODB_URI, options)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });


app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
