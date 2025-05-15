import { useEffect, useState } from "react";
import { baseApiUrl } from "@/utils/common";
import Cookies from "js-cookie";
import type { BlogsType } from "@/types/blog";

export const useBlogDetails = (id: string) => {
  const [blogData, setBlogData] = useState<BlogsType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogData = async () => {
    setIsLoading(true);
    const emailListUrl = `${baseApiUrl}/blogs/${id}`;
    const userToken = Cookies.get("userToken");

    const response = await fetch(emailListUrl, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setBlogData(data.blog);
      setIsLoading(false);
      setError(null);
    } else {
      const data = await response.json();
      setError(data.error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return { isLoading, error, blogData, fetchBlogData };
};
