import Joi from "joi";
import { RegisterData } from "../interface";

export const registerValidation = (data: RegisterData) => {
  const schema = Joi.object({
    mail: Joi.string().min(5).max(200).required().email(),
    password: Joi.string().min(5).max(1024).required(),
    username: Joi.string().min(2).max(200).required(),
  });
  return schema.validate(data);
};

module.exports = { registerValidation };
