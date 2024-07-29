function notFoundHandler(req, res, next) {
    let err = new Error(`Cannot find ${req.method} route ${req.url}`);
    err.status = 404;
    next(err);
  }
  
  export default notFoundHandler;
  