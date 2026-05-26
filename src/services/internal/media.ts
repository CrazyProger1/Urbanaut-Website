type UploadFileResult = {
  success: boolean;
  id?: string;
};

export const uploadFile = async (file: File): Promise<UploadFileResult> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/files", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return { ...data, success: response.ok && data.success !== false };
  } catch {
    return { success: false };
  }
};
