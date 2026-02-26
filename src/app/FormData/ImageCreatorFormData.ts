import axios from "axios";

export const ImageCreatorFormData = async (text: string) => {
  try {
    // const formData = new FormData();
    // formData.append("textInput", text);

    const response = await axios.post(
      "https://ai-model-back.onrender.com/create-image",
      {
        text,
      },
    );

    if (!response) {
      throw new Error("Failed to text to image");
    }

    const data = response.data;

    return data;
  } catch (error) {
    console.error("Error text:", error);
    throw error;
  }
};
