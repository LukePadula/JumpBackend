module.exports = {
  insertNoteSummary: (noteId, content) => {
    query = `INSERT INTO summaries (topic, content, note_id) `;

    content.forEach((textBlock) => {
      query += `VALUES ("${textBlock.type}", "${textBlock.data.text}", "${noteId}")`;
    });

    return query;
  },

  getNoteSummary: (id) => {
    return `SELECT id, topic, content FROM summaries WHERE note_id = ${id};`;
  },

  deleteNoteSummary: (id) => {
    return ` DELETE FROM summaries WHERE note_id = ${id}`;
  },
};
