import express, { Request, Response } from "express";
import { registerValidation } from "../utils/validation";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "joi";
import { RegisterData } from "../interface";

interface JoiResponse {
  error: Joi.ValidationError | undefined;
  value: RegisterData | undefined;
}

export const registerUser = async (req: Request, res: Response) => {
  const { error, value }: JoiResponse = registerValidation(req.body);

  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  //search if the mail exist in db

  try {
    // const emailExist = await User.findOne({ where: { mail: value?.mail! } });

    // if (emailExist) {
    //   return res
    //     .status(200)
    //     .json({ success: false, message: "email already taken" });
    // }

    //hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(value?.password!, salt);

    //save in db

    // const savedUser = await User.create({
    //   username: value?.username,
    //   email: value?.mail,
    //   password: hashedPassword,
    // });

    // const token = jwt.sign(
    //   { id: savedUser.id, email: savedUser.mail },
    //   process.env.JWT_SECRET!,
    //   { expiresIn: "1d" }
    // );

    res.status(200).json({
      success: true,
      message: "user created",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "cant create user",
    });
  }
};
