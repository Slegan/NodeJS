import * as Joi from 'joi'

const UserSchema = Joi.object({
  age: Joi.number().min(4).max(130).required(),
  id: Joi.string().required(),
  isDeleted: Joi.boolean().required(),
  login: Joi.string().alphanum().required(),
  password: Joi.string().alphanum().required(),
});

const validateLogInData = Joi.object().keys({
  login: Joi.string().required(),
  password: Joi.string().required()
});

export {
  UserSchema,
  validateLogInData,
}
