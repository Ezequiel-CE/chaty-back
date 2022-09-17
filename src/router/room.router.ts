import { Router } from "express";
import {
  getAllRooms,
  createRoom,
  getRoom,
} from "../controllers/room.controllers";

import passport from "passport";

const roomsRouter: Router = Router();

roomsRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getAllRooms
);

roomsRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getRoom
);

roomsRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createRoom
);

export default roomsRouter;
