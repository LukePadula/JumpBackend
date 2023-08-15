module.exports = {
  insertUser: (id, email, passwordHash) => {
    const params = [id, email, passwordHash];
    const query = `INSERT INTO users (id, email, password_hash) 
                       VALUES (?, ?, ?);`;

    return { query, params };
  },

  checkUserCredentials: () => {
    return `SELECT id FROM users WHERE email LIKE ? AND password_hash = ? LIMIT 1;`;
  },

  insertToken: (userId, token) => {
    const params = [userId, token];
    const query = `INSERT INTO tokens 
                      (user_id, token)
                        VALUES
                          (?, ?);`;

    return { query, params };
  },

  checkToken: (token) => {
    const params = [token];
    const query = `SELECT user_id FROM tokens WHERE token = ?;`;
    return { query, params };
  },
};
