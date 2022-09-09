import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import authRouter from "./router/auth.router";
import passport from "passport";
import configs from "./config/default";

const app: Application = express();

// middlewares

app.use(express.json());
app.use(morgan("tiny"));
app.use(passport.initialize());
import "./config/passport";

// routes

app.use("/api/auth", authRouter);

app.use("*", (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "API endpoint doesnt exist",
  });
});

const port = configs.port || 4000;

app.listen(port, () => {
  console.log(`'working on port ${port}`);
});
