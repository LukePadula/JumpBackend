const validation = (req, res, next) => {
  console.log(req.params, "Validation");
  next();
};

module.exports = validation;
