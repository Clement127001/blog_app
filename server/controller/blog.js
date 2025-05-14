const { StatusCodes } = require("http-status-codes");
const Blog = require("../models/blog");
const User = require("../models/User");
const { BadRequestError } = require("../errors");

const getAllBlogs = async (req, res) => {
  res.send("get all blogs");
};

const getSingleBlog = async (req, res) => {
  const blogId = req.params.blogId;

  const blog = await Blog.findOne({ _id: blogId }).populate("author");

  if (!blog) {
    return new BadRequestError("Blog not found");
  }

  res.status(StatusCodes.OK).json({ blog });
};

const createBlog = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findOne({ _id: userId });

  if (!user) {
    return new BadRequestError("User not found");
  }

  const blog = await Blog.create({ ...req.body, author: user._id });
  res.status(StatusCodes.CREATED).json({ blog });
};

const updateBlog = async (req, res) => {
  const blogId = req.params.blogId;

  await Blog.findOneAndUpdate({ _id: blogId }, { ...req.body });

  res.status(StatusCodes.OK).json({ msg: "Blog updated successfully" });
};

const deleteBlog = async (req, res) => {
  const blogId = req.params.blogId;

  await Blog.findOneAndDelete({ _id: blogId });

  res.status(StatusCodes.OK).json({ msg: "Blog deleted successfully" });
};

module.exports = {
  getAllBlogs,
  getSingleBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
