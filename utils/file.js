const fs = require('node:fs/promises');
const path = require('path');

module.exports = async data => {
  const savingPath = path.join(__dirname, '..', 'products.json');
  try {
    await fs.writeFile(savingPath, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
