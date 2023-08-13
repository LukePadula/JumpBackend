const { checkToken } = require("../queries/userQueries");
const runQuery = require("../database/connection");
const { param } = require("../routes/records");

const tokenAuth = async (req, res, next) => {
  const { query, params } = checkToken(req.headers.token);
  let results = await runQuery(query, params);

  if (results.length > 0) {
    req.authorisedUserId = results[0].user_id;
    next();
    return;
  }
  console.log("DENIED");
  res.status(400).send("Denied token");
  next();
};

module.exports = tokenAuth;
