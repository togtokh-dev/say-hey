import axios from "axios";
import { GPTMessage } from "../types";
import { OPENAI_API_KEY } from "../config/config";

export async function chatWithGPT(messages: GPTMessage[]): Promise<string> {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error communicating with GPT API:", error);
    return "I'm sorry, I couldn't process that.";
  }
}
