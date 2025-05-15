import type { BlogFormType, BlogsType } from "@/types/blog";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const EditBlogModal = ({ data }: { data: BlogsType }) => {
  const { title, imageUrl, category, content } = data;

  const navigate = useNavigate();

  const blogForm = useForm<BlogFormType>({
    values: {
      title,
      category,
      content,
      imageUrl,
    },
  });

  const { handleSubmit } = blogForm;

  return <div>EditBlogModal</div>;
};

export default EditBlogModal;
