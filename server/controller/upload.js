const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

const uploadMedia = async (req, res) => {
  const uploadedUrl = req.file.path;

  if (!uploadedUrl) {
    throw new BadRequestError("Failed to upload image");
  }

  return res.status(StatusCodes.CREATED).json({ imageUrl: uploadedUrl });
};

module.exports = { uploadMedia };
