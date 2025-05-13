require("dotenv").config();
require("express-async-errors");
const express = require("express");

const authRouter = require("./router/auth");
const { basePath } = require("./utils/common");
const { uploadRouter } = require("./router/upload");
const { blogRouter } = require("./router/blog");
const { connectDB } = require("./db/connect");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(basePath + "/auth", authRouter);
app.use(basePath + "/media", uploadRouter);
app.use(basePath + "/blog", blogRouter);

async function start() {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log("Server is listening on port : " + PORT));
  } catch (err) {
    console.log("Failed to start server, DB connection error");
  }
}

start();
