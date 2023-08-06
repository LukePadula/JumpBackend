const { checkToken } = require("../queries/userQueries");
const runQuery = require("../database/connection");

const tokenAuth = async (req, res, next) => {
  // let results = await runQuery(checkToken(req.headers.token));
  // if (results.length > 0) {
  //   req.authorisedUserId = results[0].user_id;
  //   next();
  //   return;
  // }
  // console.log("DENIED");
  // res.status(400).send("Denied token");
  next();
};

module.exports = tokenAuth;
