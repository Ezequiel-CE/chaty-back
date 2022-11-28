import { Request, Response } from "express";
import { registerValidation } from "../utils/validation";
import jwt from "jsonwebtoken";
import Joi from "joi";
import { RegisterData, ReqUser } from "../interface";
import configs from "../config/default";
import { registerUserService } from "../services/auth.services";

interface JoiResponse {
  error: Joi.ValidationError | undefined;
  value: RegisterData | undefined;
}

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

  try {
    const response = await registerUserService(value!);

    res.status(200).json({
      success: true,
      ...response,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
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
