import { Router, Request, Response } from "express";
import { registerUser, loginUser } from "../controllers/auth.controllers";
import passport from "passport";

const authRouter: Router = Router();

authRouter.post("/register", registerUser);
authRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  loginUser
);
authRouter.use("/isValid", (req: Request, res: Response) => {});

export default authRouter;
