const express = require("express");
const router = express.Router();
const generateId = require("../Utils/Utils");
const { formatDataHandler } = require("../Utils/formatData");

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

  const { query, params } = getRecords(object, id);
  const responseData = await runQuery(query, params);
  const data = formatDataHandler(object, responseData);
  res.status(200).send(data);
});

router.post("/:object", async (req, res) => {
  const { object } = req.params;
  const { id } = req.query;
  let insertResults;
  let query;
  let params = [];

  console.log(req.body);

  //If ID is defined, update record. Else insert record.
  if (id) {
    ({ query, params } = updateRecord(object, id, req.body));
  } else {
    ({ query, params } = createRecord(object, req.body));

    // let query = createRecord(object, req.body, req.authorisedUserId);
  }

  try {
    insertResults = await runQuery(query, params);
    console.log(insertResults);
  } catch (error) {
    // res.status(500).send("Failed to insert record");
  }
  let recordId = id ? id : insertResults;

  try {
    let { query, params } = getRecords(object, recordId);
    console.log(query, params);
    const queryResults = await runQuery(query, params);
    console.log(queryResults);
    const data = formatDataHandler(object, queryResults);

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Failed to query record");
  }
});

router.delete("/:object/:id", async (req, res) => {
  const { object, id } = req.params;
  const { query, params } = deleteRecord(object, id);
  const results = await runQuery(query, params);
  res.status(200).send(`${id} has been deleted`);
});

module.exports = router;
