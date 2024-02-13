console.clear();
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const config = require("config");
const { userAuth, adminAuth } = require("./middleware/auth");
// routes
const userRouter = require("./Routers/User/router");
const authRouter = require("./Routers/Auth/router");
// middlewares
if (app.get("env") == "development") {
  app.use(morgan("tiny"));
  console.log("morgan enabled");
}
app.use(express.json());
app.use("/user", userAuth);
app.use(helmet());

const PORT = process.env.PORT || 4000;

if (app.get("env") == "production") console.log("production start");

app.get("/", (req, res) => {
  res.status(200).send("Home Route");
});

app.use("/user", userRouter);
app.use("/auth", authRouter);

mongoose
  .connect(config.get("db.uri"))
  .then(() => console.log("DB connected"))
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
