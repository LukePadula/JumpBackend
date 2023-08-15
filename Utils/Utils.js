const { getRecords } = require("../queries/recordQueries");
const runQuery = require("../database/connection");
const { insertToken } = require("../queries/userQueries");

const generateId = () => {
  return crypto.randomUUID();
};

// Query template and return content.
const queryTemplateContent = async (templateId, authorisedUserId) => {
  let templateQuery = getRecords(
    "templates",
    String(templateId),
    authorisedUserId
  );
  const templateQueryResults = await runQuery(
    templateQuery.query,
    templateQuery.params
  );

  return templateQueryResults[0].content;
};

const generateToken = async (userId) => {
  const token = generateId();
  const { query, params } = insertToken(userId, token);
  const results = await runQuery(query, params);

  return token;
};

module.exports = {
  generateId,
  queryTemplateContent,
  generateToken,
};
