import { useBlogDetails } from "@/hooks/useBlogDetails";
import BlogDetailsSkeleton from "@/components/blog/blogDetails/BlogDetailsSkeleton";
import UserAvatar from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { lazy, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePageLoader } from "@/contexts/pageLoaderProvider";
import { baseApiUrl } from "@/utils/common";
import { toast } from "sonner";
import Cookies from "js-cookie";

const DeleteBlogConfirmationModal = lazy(
  () => import("@/components/ConfirmationModal")
);

const EditBlogModal = lazy(
  () => import("@/components/blog/blogDetails/EditBlogModal")
);

const BlogDetails = ({ blogId }: { blogId: string }) => {
  const { isLoading, error, fetchBlogData, blogData } = useBlogDetails(blogId);
  const [deleteConfirmationModalOpened, setDeleteConfirmationModalOpened] =
    useState<boolean>(false);
  const [editModalOpened, setEditModalOpened] = useState<boolean>(false);

  const navigate = useNavigate();
  const { showPageLoader, hidePageLoader } = usePageLoader();

  if (error) return <div>error</div>;

  if (isLoading) return <BlogDetailsSkeleton />;

  if (!blogData)
    return (
      <div className="font-semibold min-h-[40vh] flex items-center">
        <p className="capitalize">Blog Detail is not available</p>
      </div>
    );

  const { _id, title, author, content, imageUrl, canMutate, createdAt } =
    blogData;
  const transformedData = new Date(createdAt).toLocaleDateString();

  const handleOpenDeleteConfirmationModal = () => {
    setDeleteConfirmationModalOpened(true);
  };

  const handleCloseDeleteConfirmationModal = () => {
    setDeleteConfirmationModalOpened(false);
  };

  const handleDeleteBlog = async () => {
    showPageLoader("Logging In, please wait");

    try {
      const userToken = Cookies.get("userToken");
      const response = await fetch(baseApiUrl + "/blogs/" + _id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.ok && response.status == 200) {
        toast.success("Blog deleted", {
          description: "Blog deleted successfully",
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
          duration: 2000,
          description: err.msg ?? "Failed to delete blog",
          action: {
            label: "close",
            onClick: () => {},
          },
        });
      }
    } catch (_) {
      toast.error("Error", {
        description: "Failed to delete blog",
        duration: 2000,
        action: {
          label: "close",
          onClick: () => {},
        },
      });
    } finally {
      hidePageLoader();
      handleCloseDeleteConfirmationModal();
      navigate("/blogs");
    }
  };

  const handleOpenEditModal = () => {
    setEditModalOpened(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpened(false);
  };

  return (
    <>
      <section className="w-[60%] space-y-6">
        <div className="flex justify-between space-y-3">
          <div className="flex gap-2 items-center">
            <UserAvatar name={author.name} />
            <div>
              <p className="text-lg capitalize">{title}</p>
              <p className="text-gray-500"> Created At : {transformedData}</p>
            </div>
          </div>

          {canMutate && (
            <div className="space-x-2">
              <Button onClick={handleOpenEditModal}>
                <Edit /> Edit
              </Button>
              <Button
                className="bg-app-accent-error-500 hover:bg-app-accent-error-600"
                onClick={handleOpenDeleteConfirmationModal}
              >
                <Trash /> Delete
              </Button>
            </div>
          )}
        </div>

        <div className="bg-gray-300 flex items-center rounded-sm">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-80 object-cover rounded-sm"
            />
          ) : (
            <p>No image available</p>
          )}
        </div>

        <div className="space-y-2">
          <h4 className="text-lg font-semibold">Description</h4>
          <p>{content}</p>
        </div>
      </section>

      {canMutate && deleteConfirmationModalOpened && (
        <DeleteBlogConfirmationModal
          opened={deleteConfirmationModalOpened}
          onClose={handleCloseDeleteConfirmationModal}
          title="Delete blog"
          description="Are you sure you want to delete this blog? You cannot revert this action"
          confirmText="Yes, Delete"
          onClickConfirm={handleDeleteBlog}
        />
      )}

      {canMutate && editModalOpened && (
        <EditBlogModal
          onClose={handleCloseEditModal}
          opened={editModalOpened}
          blogData={blogData}
          fetchBlogData={fetchBlogData}
        />
      )}
    </>
  );
};

export default BlogDetails;
