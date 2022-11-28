import { Router } from "express";
import {
  getAllRooms,
  postRoom,
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
  postRoom
);

export default roomsRouter;
