const BlogListSkeleton = () => {
  return (
    <div className="py-8 space-y-8 w-[60%]">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div
            key={"blog skeleton " + index}
            className="h-30 flex gap-10 animate-pulse"
          >
            <div className="flex-5/6 space-y-3">
              <div className="flex gap-2 items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="w-[80%] h-6 bg-gray-200 rounded-sm" />
              </div>

              <div className="w-full h-6 bg-gray-200 rounded-sm" />
              <div className="w-[60%] h-6 bg-gray-200 rounded-sm" />
            </div>
            <div className="flex-1/6 rounded-sm bg-gray-300" />
          </div>
        ))}
    </div>
  );
};

export default BlogListSkeleton;
