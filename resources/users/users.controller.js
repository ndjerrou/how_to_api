const User = require('../users/users.model');
const bcrypt = require('bcrypt');

module.exports = {
  async signup(req, res) {
    // validate incoming payload (body)...

    // does this user exist already?
    let user = await User.findOne({ email: req.body.email });

    if (user)
      return res.status(400).send({ ok: false, msg: 'Account already exists' });

    user = new User(req.body);

    const salt = await bcrypt.genSalt(8); // aaa ==> masalt.123

    user.password = await bcrypt.hash(req.body.password, salt);

    try {
      await user.save();
      res.status(201).send({ ok: true, data: user });
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ ok: false, msg: 'Server Error' });
    }
  },
  async getAllUsers(req, res) {
    const users = await User.find();

    res.send(users);
  },
};
