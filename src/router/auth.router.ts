import { Router } from "express";
import {
  registerUser,
  loginUser,
  validateUser,
} from "../controllers/auth.controllers";
import passport from "passport";

const authRouter: Router = Router();

authRouter.post("/register", registerUser);
authRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  loginUser
);
authRouter.get(
  "/validate",
  passport.authenticate("jwt", { session: false }),
  validateUser
);

export default authRouter;
