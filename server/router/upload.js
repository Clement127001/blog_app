const { uploadMedia } = require("../controller/upload");

const uploadRouter = require("express").Router();

uploadRouter.post("/upload", uploadMedia);

module.exports = { uploadRouter };
