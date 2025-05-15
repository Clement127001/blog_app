const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const Blog = require("../models/blog");
const User = require("../models/User");

const getAllBlogs = async (req, res) => {
  const { author, category, pageNumber, pageSize } = req.query;

  const convertedPageNumber = +pageNumber;
  const convertedPageSize = +pageSize;

  const skip = (convertedPageNumber - 1) * convertedPageSize;

  const blogQuery = category ? { category } : {};

  const matchingAuthors = await User.find({
    name: { $regex: author, $options: "i" },
  }).select("_id");

  const authorIds = matchingAuthors.map((a) => a._id);

  const finalQuery = {
    ...blogQuery,
    author: { $in: authorIds },
  };

  const [totalItems, blogs] = await Promise.all([
    Blog.countDocuments(finalQuery),
    Blog.find(finalQuery)
      .populate("author", "_id name")
      .skip(skip)
      .limit(convertedPageSize),
  ]);

  res.status(StatusCodes.OK).json({
    blogs,
    currentPageNumber: convertedPageNumber,
    totalPages: Math.ceil(totalItems / convertedPageSize),
  });
};

const checkBlogAvailability = async (blogId, userId) => {
  const blog = await Blog.findOne({ _id: blogId, author: userId });

  if (!blog) {
    throw new BadRequestError("Blog not found");
  }
};

const getSingleBlog = async (req, res) => {
  const blogId = req.params.blogId;
  const { userId } = req.user;

  const blog = await Blog.findOne({ _id: blogId }).populate(
    "author",
    "_id name"
  );

  if (!blog) {
    return new BadRequestError("Blog not found");
  }

  res.status(StatusCodes.OK).json({
    blog: { ...blog._doc, canMutate: blog.author.id === userId },
  });
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

  const { userId } = req.user;
  await checkBlogAvailability(blogId, userId);

  await Blog.findOneAndUpdate({ _id: blogId }, { ...req.body });

  res.status(StatusCodes.OK).json({ msg: "Blog updated successfully" });
};

const deleteBlog = async (req, res) => {
  const blogId = req.params.blogId;

  const { userId } = req.user;
  await checkBlogAvailability(blogId, userId);

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
