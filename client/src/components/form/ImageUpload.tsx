import { useRef, type ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";
import { UploadCloud, X } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { usePageLoader } from "@/contexts/pageLoaderProvider";
import { uploadFile } from "@/utils/uploadFile";

const ImageUpload = ({
  name,
  label,
  required,
}: {
  name: string;
  label: string;
  required?: boolean;
}) => {
  const { setValue, watch } = useFormContext();
  const fileUploadInputRef = useRef<HTMLInputElement | null>(null);
  const previewUrl = watch(name);

  const { showPageLoader, hidePageLoader } = usePageLoader();

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      showPageLoader("Uploading image");
      const uploadResponse = await uploadFile(file, "/media/upload");
      hidePageLoader();

      if (typeof uploadResponse === "string") {
        setValue(name, uploadResponse);
        toast.success("Media Uploaded", {
          description: "Image Uploaded successfully",
          duration: 2000,
          action: {
            label: "close",
            onClick: () => {
              {
              }
            },
          },
        });
      } else {
        toast.error("Failed to upload", {
          description: "Please upload the proper file",
          duration: 2000,
          action: {
            label: "close",
            onClick: () => {
              {
              }
            },
          },
        });
      }
    }
  };

  const handleUploadImage = () => {
    if (fileUploadInputRef.current) fileUploadInputRef.current.click();
  };

  const handleRemoveImage = () => {
    setValue(name, null);
  };

  return (
    <div className="w-full space-y-2">
      {label && (
        <Label
          htmlFor={name}
          className={` dark:text-app-primary-300 capitalize text-[16px] text-black`}
        >
          {label}
          {required ? (
            <span className="text-app-accent-error-500 ml-1">*</span>
          ) : (
            ""
          )}
        </Label>
      )}

      <div
        className={`relative flex justify-center items-center rounded-md border-2  border-dashed max-w-full h-[240px] cursor-pointer overflow-hidden p-2 bg-app-primary-700/10 border-app-primary-700/50`}
      >
        {previewUrl ? (
          <>
            <img src={previewUrl} className="object-fit rounded-sm" />
            <X
              strokeWidth={3}
              className="absolute top-3 right-3 z-10 bg-red-500 text-white rounded-sm p-1"
              onClick={handleRemoveImage}
            />
          </>
        ) : (
          <>
            <div
              className={`w-full h-full flex flex-col justify-center items-center gap-2 text-app-primary-700`}
              onClick={handleUploadImage}
            >
              <UploadCloud size={40} />
              <p className="text-[16px]">Upload {label}</p>
            </div>
            <input
              type="file"
              accept="image/*"
              className="text-white hidden"
              onChange={handleFileUpload}
              ref={fileUploadInputRef}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
