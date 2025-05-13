const {
  getAllBlogs,
  getSingleBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blog");

const blogRouter = require("express").Router();

blogRouter.get("/", getAllBlogs);
blogRouter.get("/:blogId", getSingleBlog);
blogRouter.post("/", createBlog);
blogRouter.put("/:blogId", updateBlog);
blogRouter.delete("/:blogId", deleteBlog);

module.exports = { blogRouter };
