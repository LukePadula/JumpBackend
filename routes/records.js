const express = require("express");
const router = express.Router();
const generateId = require("../Utils/Utils");
const { noteFormatData } = require("../Utils/formatData");

const runQuery = require("../database/connection");
const {
  createRecord,
  updateRecord,
  deleteRecord,
  getRecords,
} = require("../queries/recordQueries");

// Example : http://localhost:6001/records/notes?id=2
router.get("/:object", async (req, res) => {
  const { object } = req.params;

  const { id } = req.query;

  const responseData = await runQuery(getRecords(object, id));
  const data = noteFormatData(responseData);
  res.status(200).send(data);
});

router.post("/:object", async (req, res) => {
  const { object } = req.params;
  const { id } = req.query;
  let insertResults;
  let query;
  console.log(id, object);

  if (id) {
    query = updateRecord(object, id, req.body);
  } else {
    query = createRecord(object, req.body, req.authorisedUserId);
  }

  console.log(query, "QUERY");
  try {
    insertResults = await runQuery(query);
  } catch (error) {
    // res.status(500).send("Failed to insert record");
  }
  let recordId = id ? id : insertResults.insertId;

  try {
    const queryResults = await runQuery(getRecords(object, recordId));
    const data = noteFormatData(queryResults);

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Failed to query record");
  }
});

router.delete("/:object/:id", async (req, res) => {
  const { object, id } = req.params;

  const results = await runQuery(deleteRecord(object, id));
  res.status(200).send(`${id} has been deleted`);
});

module.exports = router;
