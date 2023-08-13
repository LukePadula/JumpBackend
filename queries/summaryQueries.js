module.exports = {
  getNoteSummary: (noteId) => {
    console.log(noteId, "NOTE");
    const query = `SELECT topic, content FROM summaries WHERE note_id = ?`;
    const params = [noteId];
    return { query, params };
  },
  insertNoteSummary: (id, topic, content, noteId) => {
    const query = `INSERT INTO summaries (id, topic, content, note_id) VALUES (?, ?, ?, ?)`;
    const params = [id, topic, content, noteId];
    return { query, params };
  },

  deleteNoteSummary: (id, authorisedUserId) => {
    const params = [id, authorisedUserId];
    const query = `DELETE FROM summaries WHERE note_id IN (SELECT id FROM notes WHERE id = ? AND user_id = ?);`;

    return { query, params };
  },
};
