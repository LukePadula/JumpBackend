module.exports = {
  getRecords: (object, id) => {
    let query;

    if (object === "notes") {
      query = `SELECT notes.id AS id, notes.title AS title, notes.description AS description, notes.template_id as template, notes.created_date AS created, notes.last_modified_date AS modified, templates.id AS templateId, templates.title AS templateTitle
                  FROM notes LEFT JOIN templates ON notes.template_id = templates.id`;
    } else if (object === "templates") {
      query = `SELECT id, title, description FROM ${object}`;
    } else if (object === "events") {
      query = `SELECT id, title, status, start_date FROM events`;
    }

    if (id) {
      query += ` WHERE ${object}.id = ${id}`;
    }
    query += ";";

    return query;
  },

  updateRecord: (object, id, body) => {
    const { title, description, template, event, content } = body;
    let updateFields = [];

    if (title) {
      updateFields.push(`\`title\` = '${title}'`);
    }

    if (description) {
      updateFields.push(`\`description\` = '${description}'`);
    }

    if (object === "notes") {
      if (template) {
        updateFields.push(`\`template_id\` = '${template}'`);
      }
      if (event) {
        updateFields.push(`\`event_id\` = '${event}'`);
      }
    }

    if (content.content.length > 0) {
      updateFields.push(`\`content\` = '${JSON.stringify(content.content)}'`);
    }

    if (updateFields.length) {
      return `UPDATE \`${object}\` SET  ${updateFields.join(
        ", "
      )} WHERE id = ${id} `;
    }
  },

  createRecord: (object, body, authorisedUserId) => {
    const { title, description, template, event } = body;

    if (object === "notes") {
      return `INSERT INTO \`${object}\` (\`id\`, \`title\`, \`description\` , \`template_id\` , \`event_id\`, user_id) VALUES (NULL, \'${title}\', \'${description}\', \'${template}\', \'${event}\', "${authorisedUserId}" )`;
    }
    return `INSERT INTO \`${object}\` (\`id\`, \`title\`, \`description\`, user_id) VALUES (NULL, \'${title}\', \'${description}\', "${authorisedUserId}")`;
  },

  deleteRecord: (object, id) => {
    return `DELETE FROM ${object} WHERE id = "${id}";`;
  },
};
