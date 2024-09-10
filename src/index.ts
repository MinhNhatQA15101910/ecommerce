import "reflect-metadata";
import express, { Express } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes/rootRouter";

const app: Express = express();

app.use(express.json());

app.use("/api", rootRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
