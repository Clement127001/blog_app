import BlogDetails from "@/components/blog/blogDetails/BlogDetails";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
