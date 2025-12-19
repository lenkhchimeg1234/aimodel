import axios from "axios";

export const TextGenerationFormData = async (text: string) => {
    try {
         const res = await axios.post("http://localhost:4000/generate-text", {
              text,
            });
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
    

