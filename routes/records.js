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

  const { query, params } = getRecords(object, id, req.authorisedUserId);
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

  //If ID is defined, update record. Else insert record.
  if (id) {
    ({ query, params } = updateRecord(
      object,
      id,
      req.body,
      req.authorisedUserId
    ));
  } else {
    ({ query, params } = createRecord(object, req.body, req.authorisedUserId));
  }

  try {
    insertResults = await runQuery(query, params);
  } catch (error) {
    // res.status(500).send("Failed to insert record");
  }
  //If updating a record. Only refresh that record. If its creating a new record. Refresh the whole list.
  let recordId = id ? id : undefined;
  try {
    let { query, params } = getRecords(object, recordId, req.authorisedUserId);
    const queryResults = await runQuery(query, params);
    const data = formatDataHandler(object, queryResults);

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Failed to query record");
  }
});

router.delete("/:object/:id", async (req, res) => {
  const { object, id } = req.params;
  console.log(req.authorisedUserId, "AUTH ID");
  const { query, params } = deleteRecord(object, id, req.authorisedUserId);
  try {
    const results = await runQuery(query, params);
    res.send(`${id} has been deleted`);
  } catch (error) {}
});

module.exports = router;
