import express, { Application } from "express";

const app: Application = express();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`'working on port ${port}`);
});
