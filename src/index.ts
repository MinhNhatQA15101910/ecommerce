import "reflect-metadata";
import express, { Express } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes/rootRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app: Express = express();

app.use(express.json());

app.use("/api", rootRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
