const fs = require('node:fs/promises');

module.exports = async (path, data) => {
  try {
    await fs.writeFile(path, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
