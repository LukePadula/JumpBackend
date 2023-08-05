module.exports = {
  getRecords: (object, id) => {
    let query;

    console.log(object, "object");

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
    console.log(query, "QUERY");

    return query;
  },

  updateRecord: (object, id, body) => {
    const { title, description, template, event } = body;
    let updateFields = [];

    console.log(body, "BODY");

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

    if (updateFields.length) {
      return `UPDATE \`${object}\` SET  ${updateFields.join(
        ", "
      )} WHERE id = ${id} `;
    }
  },

  createRecord: (object, body) => {
    console.log("Create");
    const { title, description, template, event } = body;

    if (object === "notes") {
      return `INSERT INTO \`${object}\` (\`id\`, \`title\`, \`description\` , \`template_id\` , \`event_id\`) VALUES (NULL, \'${title}\', \'${description}\', \'${template}\', \'${event}\' )`;
    }
    return `INSERT INTO \`${object}\` (\`id\`, \`title\`, \`description\`) VALUES (NULL, \'${title}\', \'${description}\')`;
  },

  deleteRecord: (object, id) => {
    return `DELETE FROM ${object} WHERE id = "${id}";`;
  },
};
