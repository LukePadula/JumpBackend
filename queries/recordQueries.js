module.exports = {
  getRecords: (object, id) => {
    let query;
    const params = [];
    if (object === "notes") {
      query = `SELECT notes.id AS id, notes.title AS title, notes.description AS description, notes.content as content, notes.template_id as template, notes.created_date AS created, notes.last_modified_date AS modified, templates.id AS templateId, templates.title AS templateTitle
                  FROM notes 
                    LEFT JOIN templates 
                      ON notes.template_id = templates.id`;
    } else if (object === "templates") {
      query = `SELECT id, title, description 
                FROM templates`;
    } else if (object === "events") {
      query = `SELECT id, title, status, start_date 
                FROM events`;
    }

    if (id && (object === "notes" || object === "templates")) {
      params.push(id.replace(/"/g, ""));
      console.log(params);
      query += ` WHERE ${object}.id = ?`;
    }
    query += ";";
    return { query, params };
  },

  updateRecord: (object, id, body) => {
    console.log(body);
    const { title, description, template, event, content } = body;
    const updateFields = [];
    const params = [];
    let query;

    if (title) {
      updateFields.push(`\`title\` = ?`);
      params.push(title);
    }

    if (description) {
      updateFields.push(`\`description\` = ?`);
      params.push(description);
    }

    if (object === "notes") {
      if (template) {
        updateFields.push(`\`template_id\` = ?`);
        params.push(template);
      }
      if (event) {
        updateFields.push(`\`event_id\` = ?`);
        params.push(event);
      }
    }

    if (content.content.length > 0) {
      updateFields.push(`\`content\` = ?`);
      params.push(JSON.stringify(content.content));
    }

    if (updateFields.length) {
      query = `UPDATE \`${object}\` SET ${updateFields.join(
        ", "
      )} WHERE id = ${id} `;

      return { query, params };
    }
  },

  createRecord: (object, body) => {
    console.log(body);
    const { title, description, template, event } = body;
    const params = [];
    let query;

    if (title) {
      params.push(title);
    }

    if (description) {
      params.push(description);
    }

    if (template) {
      params.push(template);
    }

    if (event) {
      params.push(event);
    }

    if (object === "notes") {
      // query = `INSERT INTO notes (\`id\`, \`title\`, \`description\` , \`template_id\` , \`event_id\`, user_id) VALUES (NULL, \'${title}\', \'${description}\', \'${template}\', \'${event}\', "${authorisedUserId}" )`;
      query = `INSERT INTO notes (\`id\`, \`title\`, \`description\` , \`template_id\` , \`event_id\`, user_id) VALUES (NULL, ?, ?, ?, ?, ? )`;
    } else if (object === "templates") {
      // query = `INSERT INTO templates (\`id\`, \`title\`, \`description\`, user_id) VALUES (NULL, \'${title}\', \'${description}\', "${authorisedUserId}")`;
      query = `INSERT INTO templates (\`id\`, \`title\`, \`description\`, user_id) VALUES (NULL, ?, ?, ?)`;
    } else {
      throw new Error("Invalid object name");
    }

    return { query, params };
  },

  deleteRecord: (object, id) => {
    const params = [];
    let query;

    if (id && (object === "notes" || object === "templates")) {
      params.push(id);
      query = `DELETE FROM ${object} WHERE id = ?;`;
    } else {
      throw new Error("Record ID not provided or invalid object name");
    }

    return { query, params };
  },
};
