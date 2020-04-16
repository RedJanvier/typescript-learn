import express, { Request, Response, NextFunction } from "express";

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (req: Request, res: Response, next: NextFunction): void => {
  res.status(200).json({ message: "Hello World" });
});

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}/`)
);
