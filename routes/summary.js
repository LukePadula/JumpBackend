// const express = require("express");
// const router = express.Router();
// const runQuery = require("../database/connection");
// const {
//   insertNoteSummary,
//   deleteNoteSummary,
//   getNoteSummary,
// } = require("../queries/summaryQueries");
// const { getRecords } = require("../queries/recordQueries");
// const { generateId } = require("../Utils/Utils");

// router.post("/:id", async (req, res) => {
//   const { id } = req.params;
//   let questionSummary;
//   let positiveSummary;
//   let negativeSummary;
//   let recordData;
//   let content;

//   try {
//     const { query, params } = getRecords("notes", id, req.authorisedUserId);
//     recordData = await runQuery(query, params);
//     content = JSON.parse(recordData[0].content);
//     // const results = await runQuery(getNoteSummary(id));
//   } catch (error) {}

//   const { query, params } = deleteNoteSummary(id, req.authorisedUserId);
//   const deleteResult = await runQuery(query, params);

//   if (Array.isArray(content)) {
//     for (const block of content) {
//       const { query, params } = insertNoteSummary(
//         generateId(),
//         block.type,
//         block.data.text,
//         id
//       );
//       const insertRecord = await runQuery(query, params);
//     }
//   }
//   let summaryData;

//   const { query, params } = getNoteSummary(id);
//   summaryData = await runQuery(query, params);

//   res.send(summaryData);
// });

// router.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const { query, params } = getNoteSummary(id, req.authorisedUserId);
//     summaryData = await runQuery(query, params);
//   } catch (error) {}
//   res.status(200).send(results);
// });

// module.exports = router;
