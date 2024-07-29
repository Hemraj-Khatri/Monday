function errorHandler(error, req, res, next) {
    let statusCode = error.status || 500;
    let errMsg = error.message || "Internal Server Error";
    res.status(statusCode).send({ error: errMsg, stack: error.stack });
  }
  
  export default errorHandler;
  