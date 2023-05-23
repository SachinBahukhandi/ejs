const checkRequestHeaders = (req, res, next) => {
  res.locals.jax = req.xhr;
  next();
};

module.exports = {
  checkRequestHeaders,
};
