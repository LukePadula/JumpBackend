module.exports = {
  insertUser: (id, email, shaPassword) => {
    return `INSERT INTO users (id, email, password_hash) VALUES ("${id}", "${email}", "${shaPassword}");`;
  },

  checkUserCredentials: (email, shaPassword) => {
    console.log(email, shaPassword);
    return `SELECT id FROM users WHERE email LIKE "${email}" AND password_hash LIKE "${shaPassword}"`;
  },

  insertToken: (userId, token) => {
    return `INSERT INTO tokens 
                (user_id, token)
                    VALUES
                        ("${userId}", "${token}")`;
  },

  checkToken: (token) => {
    return `SELECT user_id FROM tokens WHERE token LIKE "${token}";`;
  },
};
