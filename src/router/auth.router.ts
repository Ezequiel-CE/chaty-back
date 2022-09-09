import { Router, Request, Response } from "express";
import { registerUser } from "../controllers/auth.controllers";

const authRouter: Router = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", (req: Request, res: Response) => {});
authRouter.use("/isValid", (req: Request, res: Response) => {});

export default authRouter;
