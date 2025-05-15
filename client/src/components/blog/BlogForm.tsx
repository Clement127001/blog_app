import type { BlogFormType } from "@/types/blog";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import { CommonInput } from "../form/CommonInput";
import { CommonSelect } from "../form/CommonSelect";
import { BlogCategoryOptions } from "@/utils/blog";
import ImageUpload from "../form/ImageUpload";
import { CommonTextArea } from "../form/CommonTextArea";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

const BlogForm = ({
  blogForm,
  onSubmit,
  isEdit,
}: {
  blogForm: UseFormReturn<BlogFormType>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isEdit?: boolean;
}) => {
  return (
    <div>
      <FormProvider {...blogForm}>
        <form onSubmit={onSubmit} className="py-3 pb-6 px-1 space-y-4">
          <CommonInput
            hForm={blogForm}
            label="book title"
            name="title"
            showError
            placeholder="Enter the book title"
            registerOptions={{
              required: "Book title is required",
              minLength: {
                value: 4,
                message: "Title should have 4 character at least",
              },
              maxLength: {
                value: 40,
                message: "Title should have 40 character at most",
              },
            }}
            inputClassName="rounded-md"
          />

          <CommonSelect
            hForm={blogForm}
            label="blog category"
            name="category"
            showError
            placeholder="Enter blog category"
            options={BlogCategoryOptions}
          />

          <ImageUpload name="imageUrl" label="Blog Image" />

          <CommonTextArea
            hForm={blogForm}
            label="Blog Content"
            name="content"
            placeholder="Enter Blog Content"
            registerOptions={{
              required: "Blog Content is required",
              minLength: {
                value: 40,
                message: "Blog Content need to be at least 40 characters",
              },
              maxLength: {
                value: 2500,
                message: "Blog Content needs to be at most 2500 characters",
              },
            }}
            inputClassName="rounded-md"
          />

          <Button type="submit" className="w-full group mt-20">
            <Plus
              strokeWidth={3}
              className="group-hover:scale-125 transition-transform duration-200 ease-in-out"
            />
            {isEdit ? "Edit Blog" : "Create Blog"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default BlogForm;
