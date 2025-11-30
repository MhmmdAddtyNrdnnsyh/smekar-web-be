import db from "./config/db.config.js";
import { responseMiddleware } from "./middlewares/response.middleware.js";
import userRoute from "./routes/user.route.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(responseMiddleware);
app.use("/api", userRoute);

const startServer = async () => {
  try {
    await db.authenticate();
    console.log("db auth success");
    await db.sync({ alter: true });
    console.log("db sync success");

    app.listen(port, () => {
      console.log(`app running on port http://localhost:${port}`);
    });
  } catch (error) {
    console.log("server error", error.message);
    process.exit(1);
  }
};

startServer();
