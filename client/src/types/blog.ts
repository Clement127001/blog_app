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

export type BlogsType = {
  _id: string;
  title: string;
  category: string;
  content: string;
  imageUrl?: string;
  author: {
    _id: string;
    name: string;
  };
  canMutate?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type BlogData = {
  blogs: BlogsType[];
  currentPageNumber: number;
  totalPages: number;
};
