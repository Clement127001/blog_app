import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogDetails from "@/components/blog/blogDetails/BlogDetails";

const BlogDetailsPage = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();

  useEffect(() => {
    if (!blogId) {
      navigate("/blogs");
    }
  }, [blogId]);

  return blogId ? (
    <div className="py-10 flex flex-col items-center gap-4">
      <BlogDetails blogId={blogId} />
    </div>
  ) : null;
};

export default BlogDetailsPage;
