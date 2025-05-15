import type { UploadMediaResponseType } from "@/types/form";
import { baseApiUrl } from "./common";
import Cookies from "js-cookie";

export const uploadFile = async (
  file: File,
  url: string
): Promise<string | { errorTitle: string; errorMessage: string }> => {
  const formData = new FormData();

  formData.append("file", file);
  const userToken = Cookies.get("userToken");

  try {
    const response = await fetch(`${baseApiUrl}${url}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      body: formData,
    });
    const fileResponse: UploadMediaResponseType = await response.json();
    return fileResponse.imageUrl;
  } catch (err: any) {
    return {
      errorTitle: "Error Occurred!",
      errorMessage:
        err?.msg || "Couldn't upload the file. Please upload it again.",
    };
  }
};
