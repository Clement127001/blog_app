import { useForm, type SubmitHandler } from "react-hook-form";
import Cookies from "js-cookie";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BlogForm from "@/components/blog/BlogForm";
import { usePageLoader } from "@/contexts/pageLoaderProvider";
import type { BlogFormType, BlogsType } from "@/types/blog";
import { baseApiUrl } from "@/utils/common";

const EditBlogModal = ({
  blogData,
  opened,
  onClose,
  fetchBlogData,
}: {
  blogData: BlogsType;
  opened: boolean;
  onClose: () => void;
  fetchBlogData: () => void;
}) => {
  const { title, imageUrl, category, content } = blogData;

  const { showPageLoader, hidePageLoader } = usePageLoader();

  const blogForm = useForm<BlogFormType>({
    values: {
      title,
      category,
      content,
      imageUrl,
    },
  });

  const { handleSubmit } = blogForm;

  const onEditBlog: SubmitHandler<BlogFormType> = async (data) => {
    showPageLoader("Editing blog");

    try {
      const userToken = Cookies.get("userToken");
      const response = await fetch(`${baseApiUrl}/blogs/${blogData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Success", {
          description: "Blog edited successfully",
          duration: 2000,
          action: {
            label: "close",
            onClick: () => {},
          },
        });
      } else {
        const err = await response.json();
        toast.error("Error", {
          description: err.msg ?? "Failed to edit blog",
          action: {
            label: "close",
            onClick: () => {},
          },
        });
      }
    } catch (_) {
      toast.error("Error", {
        description: "Failed to edit blog",
        duration: 2000,
        action: {
          label: "close",
          onClick: () => {},
        },
      });
    } finally {
      fetchBlogData();
      onClose();
      hidePageLoader();
    }
  };

  return (
    <Dialog open={opened} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader className="space-y-3">
          <DialogTitle>Edit Blog</DialogTitle>
          <DialogDescription>Edit the blog content</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start mt-4 w-full flex gap-3 h-[70vh] overflow-y-auto">
          <BlogForm
            blogForm={blogForm}
            onSubmit={handleSubmit(onEditBlog)}
            isEdit
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBlogModal;
