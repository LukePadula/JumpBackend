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
const { generateId, generateToken } = require("../Utils/Utils");

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const shaPassword = sha256(password);
  const id = generateId();

  try {
    if (email === "" || password === "") {
      throw new Error("No username or password");
    }
    const { query, params } = insertUser(id, email, shaPassword);
    const response = await runQuery(query, params);

    const token = await generateToken(id);
    res.cookie("token", token);
    res.status(200).send({ status: "authorised", token });
  } catch (error) {
    res.status(500).send(error);
    return;
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const shaPassword = sha256(password);

  try {
    if (email === "" || password === "") {
      throw new Error("No username or password");
    }
    const results = await runQuery(checkUserCredentials(), [
      email,
      shaPassword,
    ]);

    if (results.length > 0) {
      const token = await generateToken(results[0].id);
      res.cookie("token", token);
      res.status(200).send({ status: "authorised", token });
    } else {
      res.status(200).send({ status: "denied" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
