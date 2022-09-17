import { Request, Response } from "express";

export const getAllRooms = (req: Request, res: Response) => {
  res.send("route for all rooms");
};

export const getRoom = (req: Request, res: Response) => {
  res.send("route for 1 room");
};
export const createRoom = (req: Request, res: Response) => {
  res.send("route for creating a room");
};
