import Pagination from "@/components/Pagination";
import { useBlogsList } from "@/hooks/useBlogsList";
import type { BlogFilterType } from "@/types/blog";
import BlogListSkeleton from "@/components/blog/allBlogs/BlogListSkeleton";
import UserAvatar from "@/components/UserAvatar";
import { Link } from "react-router-dom";

const BlogsList = ({
  filterQuery,
  setFilterQuery,
}: {
  filterQuery: BlogFilterType;
  setFilterQuery: (value: BlogFilterType) => void;
}) => {
  const { isLoading, error, blogList } = useBlogsList(filterQuery);

  if (error) return <div>error</div>;
  if (isLoading) return <BlogListSkeleton />;

  const handleChangePageNumber = (val: number) => {
    setFilterQuery({ ...filterQuery, pageNumber: val });
  };

  if (!blogList || blogList.blogs.length === 0)
    return (
      <div className="font-semibold min-h-[40vh] flex items-center">
        <p className="capitalize">
          no blogs available, try to change the filter
        </p>
      </div>
    );

  return (
    <div className="py-8 space-y-8 w-[60%]">
      {blogList.blogs.map((blog) => {
        const { _id, imageUrl, title, author, content } = blog;

        return (
          <Link
            to={"/blogs/" + _id}
            key={_id}
            className="min-h-30 flex gap-10 hover:bg-gray-100 p-3 rounded-md"
          >
            <div className="flex-5/6 space-y-3">
              <div className="flex gap-2 items-center">
                <UserAvatar name={author.name} />
                <p className="text-lg capitalize">{title}</p>
              </div>
              <p className="line-clamp-2 text-gray-600 ">{content}</p>
            </div>
            <div className="flex-1/6 rounded-sm bg-gray-300">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover rounded-sm"
                />
              ) : null}
            </div>
          </Link>
        );
      })}
      <Pagination
        currentPage={filterQuery.pageNumber}
        handleChangePageNumber={handleChangePageNumber}
        totalPages={blogList.totalPages}
      />
    </div>
  );
};

export default BlogsList;
