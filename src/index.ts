import "colors";
import path from "path";
import express from "express";
import { config } from "dotenv";

import routes from "./routes";

config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api/v1", routes);

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}/api/v1`)
);
