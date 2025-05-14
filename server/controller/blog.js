const { StatusCodes } = require("http-status-codes");
const Blog = require("../models/blog");
const User = require("../models/User");
const { BadRequestError } = require("../errors");

const getAllBlogs = async (req, res) => {
  const { author, category, pageNumber, pageSize } = req.query;

  const convertedPageNumber = +pageNumber;
  const convertedPageSize = +pageSize;

  const skip = (convertedPageNumber - 1) * convertedPageSize;

  const blogQuery = category ? { category } : {};

  const blogs = await Blog.find(blogQuery)
    .populate({
      path: "author",
      match: { name: { $regex: author, $options: "i" } },
      select: "_id name",
    })
    .skip(skip)
    .limit(convertedPageSize);

  const filteredBlogs = blogs.filter((blog) => blog.author);

  res.status(StatusCodes.OK).json({ blogs: filteredBlogs });
};

const checkBlogAvailability = async (blogId) => {
  const blog = await Blog.findById(blogId);

  if (!blog) {
    throw new BadRequestError("Blog not found");
  }
};

const getSingleBlog = async (req, res) => {
  const blogId = req.params.blogId;

  const blog = await Blog.findOne({ _id: blogId }).populate(
    "author",
    "_id name"
  );

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

  await checkBlogAvailability(blogId);

  await Blog.findOneAndUpdate({ _id: blogId }, { ...req.body });

  res.status(StatusCodes.OK).json({ msg: "Blog updated successfully" });
};

const deleteBlog = async (req, res) => {
  const blogId = req.params.blogId;

  await checkBlogAvailability(blogId);

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
