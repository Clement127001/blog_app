import { useEffect, useState } from "react";
import { baseApiUrl } from "@/utils/common";
import Cookies from "js-cookie";
import type { BlogData, BlogFilterType } from "@/types/blog";

export const useBlogsList = (filterQuery: BlogFilterType) => {
  const [blogList, setBlogList] = useState<BlogData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { author, category, pageNumber } = filterQuery;

  const fetchBlogList = async () => {
    setIsLoading(true);
    const emailListUrl = `${baseApiUrl}/blogs/?author=${author}&category=${category}&pageNumber=${pageNumber}&pageSize=${String(
      5
    )}`;
    const userToken = Cookies.get("userToken");

    const response = await fetch(emailListUrl, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (response.ok) {
      const data: BlogData = await response.json();
      setBlogList(data);
      setIsLoading(false);
      setError(null);
    } else {
      const data = await response.json();
      setError(data.error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogList();
  }, [pageNumber, category, author]);

  return { isLoading, error, blogList, fetchBlogList };
};
