import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { registerValidation } from "../utils/validation";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "joi";
import { RegisterData, ReqUser } from "../interface";
import configs from "../config/default";

interface JoiResponse {
  error: Joi.ValidationError | undefined;
  value: RegisterData | undefined;
}

const prisma = new PrismaClient();

/**
 *Endpoint for register users
 *
 * @param req
 * @param res
 * @returns Response{ success: boolean,message: string,token: string}
 */

export const registerUser = async (req: Request, res: Response) => {
  const { error, value }: JoiResponse = registerValidation(req.body);

  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  //search if the mail exist in db

  try {
    const userExist = await prisma.user.findUnique({
      where: { mail: value?.mail },
    });
    // const emailExist = await User.findOne({ where: { mail: value?.mail! } });

    if (userExist) {
      return res
        .status(200)
        .json({ success: false, message: "email already taken" });
    }

    //hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(value?.password!, salt);

    //save in db

    const savedUser = await prisma.user.create({
      data: {
        mail: value?.mail!,
        password: hashedPassword,
        username: value?.username!,
      },
    });

    const token = jwt.sign(
      { id: savedUser.id, mail: savedUser.mail, username: savedUser.username },
      configs.jwtSecret,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "user created",
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "cant create user",
    });
  }
};

/**
 *Endpoint for login users
 *
 * @param req
 * @param res
 * @returns Response{ success: boolean,token: string}
 */

export const loginUser = (req: ReqUser, res: Response) => {
  const { user } = req;

  const token = jwt.sign(
    { id: user?.id, mail: user?.mail, username: user?.username },
    configs.jwtSecret,
    {
      expiresIn: "1d",
    }
  );
  res.status(200).json({
    success: true,
    token,
    user,
  });
};

/**
 *Endpoint for validating tokens
 *
 * @param req
 * @param res
 * @returns Response{ success: boolean,user:{}}
 */

export const validateUser = async (req: ReqUser, res: Response) => {
  const { user } = req;

  res.status(200).json({
    success: true,
    user,
  });
};
