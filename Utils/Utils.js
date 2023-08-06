const generateId = () => {
  return crypto.randomUUID();
};

module.exports = { generateId };
