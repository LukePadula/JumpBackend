module.exports = {
  createToken: (userId, token) => {
    return `INSERT INTO tokens (user_Id, token) values ("${userId}", "${token}")`;
  },

  checkToken: (token) => {
    return `SELECT id FROM tokens WHERE token LIKE "${token}";`;
  },

  getRecords: (object, id) => {
    let query;

    if (object === "notes") {
      query = `SELECT notes.id, notes.title, notes.description, notes.template_Id, notes.event_id, templates.id, templates.title 
                FROM notes LEFT JOIN templates ON notes.template_Id = templates.id`;
    } else if (object === "templates") {
      query = `SELECT id, title, description FROM ${object}`;
    } else if (object === "events") {
      query = ``;
    }
    if (id) {
      query += ` WHERE id = ${id};`;
    }
    console.log(query);

    return query;
  },

  updateRecord: (object, id, body) => {
    const { title, description, template, event } = body;
    let updateFields = [];

    if (title) {
      updateFields.push(`\`title\` = '${title}'`);
    }

    if (description) {
      updateFields.push(`\`description\` = '${description}'`);
    }

    if (object === note) {
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
    } else {
      res.status(400).send("Update values not specified.");
    }
  },

  createRecord: (object, body) => {
    const { title, description } = body;

    return `INSERT INTO \`${object}\` (\`id\`, \`title\`, \`description\`) VALUES (NULL, \'${title}\', \'${description}\')`;
  },

  deleteRecord: (object, id) => {
    return `DELETE FROM ${object} WHERE id = ${id};`;
  },

  insertNoteSummary: (noteId, content) => {
    query = `INSERT INTO summaries ("id", subject, content, note_id) VALUES `;

    content.forEach((textBlock) => {
      query += `VALUES (NULL, ${textBlock.type}, ${textBlock.data.text}, ${noteId})`;
    });

    return query;
  },

  getNoteSummary: (id) => {
    return `SELECT id, subject, content FROM summaries WHERE note_id = ${id};`;
  },

  deleteNoteSummary: (id) => {
    return ` DELETE FROM summaries WHERE note_id = ${id}`;
  },
};
