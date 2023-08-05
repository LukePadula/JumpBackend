const checkToken = async (req, res, next) => {
  if (results.length > 0) {
    next();
    return;
  }

  res.status(200).send("Invalid token");
};

module.exports = checktoken;
