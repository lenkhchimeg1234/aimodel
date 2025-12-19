import axios from "axios";

export const ImageAnalysisFormData = async (imageFile: File) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await axios.post(
      "http://localhost:4000/analyze-image",
      formData
    );

  

    if (!response) {
      throw new Error("Failed to upload image");
    }

  
    const data = response;
    return data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
