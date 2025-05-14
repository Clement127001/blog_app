require("dotenv").config();
require("express-async-errors");
const express = require("express");
const multer = require("multer");

const { authRouter } = require("./router/auth");
const { uploadRouter } = require("./router/upload");
const { blogRouter } = require("./router/blog");

const { basePath } = require("./utils/common");
const { connectDB } = require("./db/connect");
const { storage } = require("./utils/upload");

const allowCrossDomain = require("./middlewares/allow-cors");
const notFound = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const authMiddleware = require("./middlewares/authentication");

const app = express();
const upload = multer({ storage });
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(allowCrossDomain);

app.use(basePath + "/auth", authRouter);
app.use(
  basePath + "/media",
  authMiddleware,
  upload.single("file"),
  uploadRouter
);
app.use(basePath + "/blogs", authMiddleware, blogRouter);

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
