import BlogFilter from "@/components/blog/allblogs/BlogsFilter";
import BlogsList from "@/components/blog/allblogs/BlogsList";

import type { BlogFilterType } from "@/types/blog";
import { BlogCategoryOptions } from "@/utils/blog";
import { useState } from "react";

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
