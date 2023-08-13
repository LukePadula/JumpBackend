module.exports = {
  insertUser: () => {
    return `INSERT INTO users (id, email, password_hash) 
              VALUES (?, ?, ?);`;
  },

  checkUserCredentials: () => {
    return `SELECT id FROM users WHERE email LIKE ? AND password_hash = ? LIMIT 1;`;
  },

  insertToken: (userId, token) => {
    return `INSERT INTO tokens 
                (user_id, token)
                    VALUES
                        (?, ?);`;
  },

  checkToken: (token) => {
    const params = [token];
    const query = `SELECT user_id FROM tokens WHERE token LIKE ?;`;
    return { query, params };
  },
};
