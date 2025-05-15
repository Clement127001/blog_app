import { useState } from "react";
import BlogFilter from "@/components/blog/allBlogs/BlogsFilter";
import BlogsList from "@/components/blog/allBlogs/BlogsList";
import type { BlogFilterType } from "@/types/blog";
import { BlogCategoryOptions } from "@/utils/blog";

const AllBlogsPage = () => {
  const [filterQuery, setFilterQuery] = useState<BlogFilterType>({
    author: "",
    pageNumber: 1,
    category: BlogCategoryOptions[0].value,
  });

  return (
    <div className="py-10 flex flex-col items-center gap-4">
      <BlogFilter filterQuery={filterQuery} setFilterQuery={setFilterQuery} />
      <BlogsList filterQuery={filterQuery} setFilterQuery={setFilterQuery} />
    </div>
  );
};

export default AllBlogsPage;
