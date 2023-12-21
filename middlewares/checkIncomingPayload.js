const Joi = require('joi');

module.exports = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string(),
    year: Joi.number(),
    color: Joi.string(),
    desc: Joi.string(),
    price: Joi.number(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    return res.status(400).send({
      ok: false,
      msg: result.error.details[0].message,
    });
  }
  next();
};
