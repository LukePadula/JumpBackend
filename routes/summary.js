const express = require("express");
const router = express.Router();
const runQuery = require("../database/connection");
const {
  getNoteSummary,
  insertNoteSummary,
  deleteNoteSummary,
} = require("../queries/summaryQueries");

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const questionSummary = [];
  const positiveSummary = [];
  const negativeSummary = [];

  content.forEach((block) => {
    if (element.data.text) {
      switch (element.type) {
        case "question":
          //Insert

          break;
        case "positive":
          positiveSummary.push(element.data.text);
          break;
        case "negative":
          negativeSummary.push(element.data.text);
          break;
        default:
          break;
      }
    }
  });

  const deletionResults = await runQuery(deleteNoteSummary(id));
  const results = await runQuery(insertNoteSummary(id, content));

  res.status(200).send(results);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const results = await runQuery(getNoteSummary(id));

  res.status(200).send(results);
});

module.exports = router;
