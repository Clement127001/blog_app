import { useForm, type SubmitHandler } from "react-hook-form";
import BlogForm from "./BlogForm";
import type { BlogFormType } from "@/types/blog";
import { BlogCategoryOptions } from "@/utils/blog";
import { usePageLoader } from "@/contexts/pageLoaderProvider";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { baseApiUrl } from "@/utils/common";
import { toast } from "sonner";
import BackButton from "@/components/BackButton";

const CreateBlog = () => {
  const blogForm = useForm<BlogFormType>({
    defaultValues: {
      title: "",
      category: BlogCategoryOptions[0].value,
      content: "",
    },
  });

  const { showPageLoader, hidePageLoader } = usePageLoader();
  const navigate = useNavigate();

  const { handleSubmit } = blogForm;

  const onCreateBlog: SubmitHandler<BlogFormType> = async (data) => {
    showPageLoader("Creating blog");

    try {
      const userToken = Cookies.get("userToken");
      const response = await fetch(`${baseApiUrl}/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Success", {
          description: "Blog created successfully",
          duration: 2000,
          action: {
            label: "close",
            onClick: () => {},
          },
        });

        navigate("/blogs");
      } else {
        const err = await response.json();
        toast.error("Error", {
          description: err.msg,
          action: {
            label: "close",
            onClick: () => {},
          },
        });
      }
    } catch (_) {
      toast.error("Error", {
        description: "Failed to create email template",
        duration: 2000,
        action: {
          label: "close",
          onClick: () => {},
        },
      });
    } finally {
      hidePageLoader();
    }
  };

  return (
    <div className="py-10 space-y-4 max-w-[60%] mx-auto">
      <BackButton />
      <BlogForm blogForm={blogForm} onSubmit={handleSubmit(onCreateBlog)} />
    </div>
  );
};

export default CreateBlog;
