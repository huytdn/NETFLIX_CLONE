import axios from "axios";

export async function getAIRecommendation(prompt) {
  try {
    const res = await axios.post(
      "http://localhost:5050/api/ai-recommendations",
      {
        prompt,
      }
    );
    return res.data.text;
  } catch (err) {
    console.error("Error calling backend:", err);
    return null;
  }
}
