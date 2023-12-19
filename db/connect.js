const mongoose = require('mongoose');

module.exports = async () => {
  console.log(process.env);
  const URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWD}@db.tounu.mongodb.net/products-3wa`;

  try {
    await mongoose.connect(URL);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err.message);
  }
};
