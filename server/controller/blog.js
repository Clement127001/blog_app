const getAllBlogs = (req, res) => {
  res.send("get all blogs");
};

const getSingleBlog = (req, res) => {
  const blogId = req.params.blogId;
  res.send("get single blog with id : " + blogId);
};

const createBlog = (req, res) => {
  res.send("create new blog");
};

const updateBlog = (req, res) => {
  const blogId = req.params.blogId;
  res.send("update blog  with id : " + blogId);
};

const deleteBlog = (req, res) => {
  const blogId = req.params.blogId;
  res.send("delete blog with id : " + blogId);
};

module.exports = {
  getAllBlogs,
  getSingleBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
