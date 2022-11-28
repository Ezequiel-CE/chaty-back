import { PrismaClient } from "@prisma/client";
import { prisma } from "../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import configs from "../config/default";
import { RegisterData } from "../interface";

export const registerUserService = async (data: RegisterData) => {
  //search if the mail exist in db
  const userExist = await prisma.user.findUnique({
    where: { mail: data?.mail },
  });

  if (userExist) throw new Error("user already exists");

  //hash password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data?.password!, salt);

  //save in db

  const savedUser = await prisma.user.create({
    data: {
      mail: data?.mail!,
      password: hashedPassword,
      username: data?.username!,
    },
  });

  const userData = {
    id: savedUser.id,
    mail: savedUser.mail,
    username: savedUser.username,
  };
  const token = jwt.sign(userData, configs.jwtSecret, { expiresIn: "1d" });

  return { userData, token };
};
