export type BlogFormType = {
  title: string;
  content: string;
  imageUrl?: string;
  category: string;
};

export type BlogFilterType = {
  author: string;
  category: string;
  pageNumber: number;
};

export type Blogs = {
  _id: string;
  title: string;
  category: string;
  content: string;
  imageUrl?: string;
  author: {
    _id: string;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

export type BlogData = {
  blogs: Blogs[];
  currentPageNumber: number;
  totalPages: number;
};
