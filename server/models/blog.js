const mongoose = require("mongoose");
const { BlogCategory } = require("../utils/blog");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [4, "Title should have 4 characters at least"],
      maxlength: [100, "Title should have 100 characters at most"],
      trim: true,
    },
    category: {
      type: String,
      enum: Object.values(BlogCategory),
      required: [true, "Category is required"],
    },
    content: {
      type: String,
      required: [true, "Blog Content is required"],
      minlength: [40, "Blog content should have 40 characters at least"],
      maxlength: [2500, "Blog content should have 2500 characters at most"],
    },
    imageUrl: {
      type: String,
    },
    author: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
