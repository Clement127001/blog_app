require("dotenv").config();
require("express-async-errors");
const express = require("express");

const authRouter = require("./router/auth");
const { basePath } = require("./utils/common");
const { uploadRouter } = require("./router/upload");
const { blogRouter } = require("./router/blog");
const { connectDB } = require("./db/connect");
const allowCrossDomain = require("./middlewares/allow-cors");
const notFound = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const authMiddleware = require("./middlewares/authentication");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(allowCrossDomain);

app.use(basePath + "/auth", authRouter);
app.use(basePath + "/media", authMiddleware, uploadRouter);
app.use(basePath + "/blog", authMiddleware, blogRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

async function start() {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log("Server is listening on port : " + PORT));
  } catch (err) {
    console.log("Failed to start server, DB connection error");
  }
}

start();
