const checkRequestHeaders = (req, res, next) => {
  console.error("Time:", Date.now(), req.xhr, req.get("Content-Type"));
  res.locals.returnJSON =
    req.get("Content-Type") == "application/json" ? true : false;
  next();
};

module.exports = {
  checkRequestHeaders,
};
