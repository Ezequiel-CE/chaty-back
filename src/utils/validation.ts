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

export const roomNameValidation = (name: string) => {
  const mySchema = Joi.string().min(2).max(30).required();
  return mySchema.validate(name);
};
