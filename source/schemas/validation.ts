import * as Joi from 'joi'

const UserSchema = Joi.object({
  id: Joi.string().required(),
  login: Joi.string().alphanum().required(),
  password: Joi.string().alphanum().required(),
  age: Joi.number().min(4).max(130).required(),
  isDeleted: Joi.boolean().required(),
});

export { UserSchema }
