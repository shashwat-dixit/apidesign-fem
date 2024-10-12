import express from "express";
import router from "./router";
import { protect } from "./modules/auth";
import morgan from "morgan";
import cors from "cors";
import { createNewUser, signin } from "./handlers/user";
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.shhh_secret = "doggy";
  next();
});

app.get("/", (req, res) => {
  console.log("hello, world!");
  res.status(200);
  res.json({ message: "hello" });
});

app.post("/user", createNewUser);
app.post("/signin", signin);
app.use("/api", protect, router);

export default app;
