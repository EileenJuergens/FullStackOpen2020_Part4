const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response, next) => {
  response
    .status(404)
    .send({ error: 'unknown endpoint' });

  next();
};

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    response
      .status(400)
      .send({ error: 'malformatted id' });
  }

  if (error.name === 'ValidationError') {
    response
      .status(400)
      .json({ error: error.message });
  }

  if (error.name === 'JsonWebTokenError') {
    response
      .status(401)
      .json({ error: 'invalid token' });
  }

  logger.error(error.message);
  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }

  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};
