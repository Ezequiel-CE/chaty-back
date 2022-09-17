import { Request, Response } from "express";
import { ReqUser } from "../interface";
import { prisma } from "../config/db";
import { roomNameValidation } from "../utils/validation";
import Joi from "joi";
import { json } from "stream/consumers";

interface JoiResponse {
  error: Joi.ValidationError | undefined;
  value: string | undefined;
}

export const getAllRooms = (req: Request, res: Response) => {
  res.send("route for all rooms");
};

export const getRoom = (req: Request, res: Response) => {
  res.send("route for 1 room");
};
export const createRoom = async (req: ReqUser, res: Response) => {
  const name: string = req.body.name;
  console.log(req.user);
  const { error, value: roomName }: JoiResponse = roomNameValidation(name);

  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  const savedRoom = await prisma.room.create({
    data: { name: roomName!, userId: req.user?.id! },
  });

  res.status(200).json({ success: true, room: savedRoom });
};
