const mongoose = require("mongoose");
const { BlogCategory } = require("../utils/common");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [4, "Name should have 4 characters at least"],
      maxlength: [100, "Name should have 100 characters at most"],
      trim: true,
    },
    category: {
      type: {
        type: String,
        enum: Object.values(BlogCategory),
        required: [true, "Category is required"],
      },
    },
    content: {
      type: String,
      required: [true, "Blog Content is required"],
      minlength: [40, "Blog content must be at least 40 characters"],
      maxlength: [2500, "Blog content must be at most 2500 characters"],
    },
    imageUrl: {
      type: String,
    },
    author: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps }
);

module.exports = mongoose.model("Blog", blogSchema);
