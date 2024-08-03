const Joi = require("joi");

const resourceSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  type: Joi.string().valid("document", "video", "audio", "image").required(),
  url: Joi.string().uri().required(),
  tags: Joi.array().items(Joi.string()).required(),
  createdBy: Joi.string().required(),
});

const validateResource = (req, res, next) => {
  const { error } = resourceSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = {
  validateResource,
};
