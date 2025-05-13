const basePath = "/api";

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const BlogCategory = {
  CAREER: "Career",
  Finance: "Finance",
  TRAVEL: "Travel",
};

module.exports = { basePath, emailRegex, BlogCategory };
