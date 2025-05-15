import { CommonInput } from "@/components/form/CommonInput";
import { CommonSelect } from "@/components/form/CommonSelect";
import { Button } from "@/components/ui/button";
import type { BlogFilterType } from "@/types/blog";
import { BlogCategoryOptions } from "@/utils/blog";
import { useForm, type SubmitHandler } from "react-hook-form";

type BlogFilterFormType = Omit<BlogFilterType, "pageNumber">;

const BlogFilter = ({
  filterQuery,
  setFilterQuery,
}: {
  filterQuery: BlogFilterType;
  setFilterQuery: (value: BlogFilterType) => void;
}) => {
  const { author, category } = filterQuery;

  const blogFilterForm = useForm<BlogFilterFormType>({
    defaultValues: { author, category },
    values: { author, category },
  });

  const { handleSubmit } = blogFilterForm;

  const onChangeFilter: SubmitHandler<BlogFilterFormType> = (data) => {
    setFilterQuery({ ...filterQuery, ...data, pageNumber: 1 });
  };

  return (
    <form onSubmit={handleSubmit(onChangeFilter)} className="flex gap-3">
      <CommonInput
        hForm={blogFilterForm}
        name="author"
        placeholder="Enter author name"
        inputClassName="rounded-full min-w-[300px]"
      />
      <CommonSelect
        hForm={blogFilterForm}
        name="category"
        showError
        placeholder="Enter blog category"
        options={BlogCategoryOptions}
        wrapperClassName="min-w-[200px]"
        inputClassName="rounded-full"
      />
      <Button className="rounded-full">Search</Button>
    </form>
  );
};

export default BlogFilter;
