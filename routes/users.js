const express = require("express");
const router = express.Router();
const runQuery = require("../database/connection");
const sha256 = require("sha256");
const {
  insertUser,
  checkUserCredentials,
  insertToken,
  checkToken,
} = require("../queries/userQueries");
const { generateId } = require("../Utils/Utils");

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const shaPassword = sha256(password);
  const id = generateId();

  try {
    response = await runQuery(insertUser(), [id, email, shaPassword]);
    res.status(200).send("Inserted user");
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to insert user");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const shaPassword = sha256(password);

  try {
    results = await runQuery(checkUserCredentials(), [email, shaPassword]);
    if (results.length > 0) {
      const token = generateId();
      results = await runQuery(insertToken(), [results[0].id, token]);
      res.cookie("token", token);
      console.log("Successfully logged in ");
      res.status(200).send(token);
    } else {
      res.status(200).send("Denied access");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to insert user");
  }
});
module.exports = router;
