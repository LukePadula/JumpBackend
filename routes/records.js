const express = require("express");
const router = express.Router();
const notes = require("../Data/notes.json");
const templates = require("../Data/templates.json");

// Example : http://localhost:6001/records/note?id=2
router.get("/:object", (req, res) => {
  const { object } = req.params;
  const { id } = req.query;
  let records = [];

  console.log(req.params, "Route");

  if (object === "note") {
    records = notes;
  } else {
    records = templates;
  }

  if (id) {
    const index = records.findIndex((item) => item.id === id);
    _records = [...records];
    records = _records[index];
  }

  res.send(records);
});

router.post("/:object", (req, res) => {
  const { object } = req.params;
  const { id } = req.query;
  console.log("post");

  console.log(req.headers);

  console.log(req.body, "BODY");
  res.send("yo");

  //If Id update, else create
  if (id) {
  }
});

router.delete("/:object/:id", (req, res) => {
  const { object, id } = req.params;
  records = [];

  if (object === "note") {
    records = notes;
  } else {
    records = templates;
  }

  const index = records.findIndex((item) => item.id === id);
  _records = [...records];
  records = _records[index];

  res.send(`${id} has been deleted`);
});

module.exports = router;
