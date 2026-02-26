import axios from "axios";

export const TextGenerationFormData = async (text: string) => {
  try {
    const res = await axios.post(
      "https://ai-model-back.onrender.com/generate-text",
      {
        text,
      },
    );
    if (!res) {
      throw new Error("Failed to text to generate");
    }

    const data = res.data;

    return data;
  } catch (error) {
    console.error("Error text:", error);
    throw error;
  }
};
