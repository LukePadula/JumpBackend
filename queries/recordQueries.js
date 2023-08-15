module.exports = {
  getRecords: (object, id, authorisedUserId) => {
    let query;
    const params = [];

    if (object === "notes") {
      query = `SELECT notes.id AS id, notes.title AS title, notes.description AS description, notes.content as content, notes.template_id as template, notes.event_id as event , UNIX_TIMESTAMP(notes.created_date) AS created, UNIX_TIMESTAMP(notes.last_modified_date) AS modified, templates.id AS templateId, templates.title AS templateTitle, templates.content AS templateContent, events.id AS eventId, events.title AS eventTitle FROM notes LEFT JOIN templates ON notes.template_id = templates.id LEFT JOIN events ON notes.event_id = events.id`;
    } else if (object === "templates") {
      query = `SELECT id, title, description, content 
                FROM templates`;
    } else if (object === "events") {
      query = `SELECT id, title, status 
                FROM events`;
    }

    // If id is present and note or template. Query by individual ID. Else query all records belonging to user.
    if (id && (object === "notes" || object === "templates")) {
      params.push(id.replace(/"/g, ""));
      query += ` WHERE ${object}.id = ? AND  ${object}.user_id = ?;`;
    } else {
      query += ` WHERE ${object}.user_id = ?;`;
    }
    params.push(authorisedUserId);
    return { query, params };
  },

  updateRecord: (object, id, body, authorisedUserId) => {
    const { title, description, template, event, content } = body;
    const updateFields = [];
    const params = [];
    let query;

    if (title) {
      updateFields.push(`\`title\` = ?`);
      params.push(title);
    }

    // Will allow you to completley delete contents of field.
    if (description != undefined) {
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

    // If content is present. Update.
    if (Array.isArray(content) && content.length > 0) {
      updateFields.push(`\`content\` = ?`);
      params.push(JSON.stringify(content));
    }
    params.push(id.replace(/"/g, ""));
    params.push(authorisedUserId);

    if (updateFields.length) {
      query = `UPDATE \`${object}\` SET ${updateFields.join(
        ", "
      )} WHERE id = ? AND user_id = ?  `;

      return { query, params };
    }
  },

  createRecord: (object, body, recordId, authorisedUserId, content) => {
    const { title, description, template, event } = body;
    const insertFields = [];
    const params = [];
    let query;

    // Set default record values
    params.push(recordId);
    params.push(title);
    params.push(description);

    if (object === "notes") {
      params.push(template === undefined ? "" : template);
      params.push(event === undefined ? "" : event);
      params.push(content);

      query = `INSERT INTO notes (id, title, description , template_id, event_id, content, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    } else if (object === "templates") {
      query = `INSERT INTO templates (id, title, description, user_id) VALUES (?, ?, ?, ?)`;
    } else {
      throw new Error("Invalid object name");
    }

    // Set user id param.
    params.push(authorisedUserId);

    return { query, params };
  },

  deleteRecord: (object, id, authorisedUserId) => {
    const params = [];
    let query;

    if (id && (object === "notes" || object === "templates")) {
      params.push(id);
      params.push(authorisedUserId);
      query = `DELETE FROM ${object} WHERE id = ? AND user_id = ? LIMIT 1;`;
    } else {
      throw new Error("Record ID not provided or invalid object name");
    }

    return { query, params };
  },
};
