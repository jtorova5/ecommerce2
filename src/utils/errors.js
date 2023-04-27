
const enumErrors = require('../errors/enumErrors');

const errorList = async (error, req, res, next) => {
  switch (error.code) {
    case enumErrors.UNDEFINED_ERROR:
      return res.status(500).send({ status: 500, error: 'Undefined' });
    case enumErrors.ERROR_FROM_SERVER:
      return res.status(500).send({
        status: 500,
        error: 'Error from server',
        cause: 'The system failed when trying execute a process',
        message: 'We are working to fix this issue',
      });
    case enumErrors.INVALID_FILTER:
      return res.status(error.statusCode).send({
        status: error.statusCode,
        error: error.name,
        cause: error.cause,
        message: error.message,
      });
    case enumErrors.MISSING_VALUES:
      return res.status(error.statusCode).send({
        status: error.statusCode,
        error: error.name,
        cause: error.cause,
        message: error.message,
      });
    case enumErrors.UNEXPECTED_VALUE:
      return res.status(error.statusCode).send({
        status: error.statusCode,
        error: error.name,
        cause: error.cause,
        message: error.message,
      });
    default:
      return res.send({ status: 'Error', error: 'Unknown' });
  }
};
module.exports = errorList; 