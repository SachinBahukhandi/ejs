const checkRequestHeaders = (req, res, next) => {
    console.log('hellooo');
//     res.locals.jax = req.xhr;
//   console.log(res.locals);
  next();
};

module.exports = {
  checkRequestHeaders,
};
