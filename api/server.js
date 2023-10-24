import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// const PORT = 4000;
import { toursRouter } from "./route/tour.router.js";

// express app
const app = express();
app.use(express.json());

app.use("/tours", toursRouter);

async function startServer() {
  mongoose.connection.once("open", () => {
    console.log("mongo is ready");
  });

  mongoose.connection.on("error", (err) => {
    console.error(err);
  });

  await mongoose.connect(process.env.MONG_ULI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app.listen(process.env.PORT, () => {
    console.log("listening on port: " + process.env.PORT);
  });
}

startServer();

//middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
