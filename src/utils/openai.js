// import OpenAI from "openai";
// import { OPENAI_KEY } from "./constants";

// const openai = new OpenAI({
//   apiKey: OPENAI_KEY,
//   dangerouslyAllowBrowser: true,
// });

// export default openai;

// src/utils/openai.js
// NOTE:
// Frontend me OpenAI SDK use nahi karte (security + CRA issues)
// Isliye yahan mock / stub rakha hai.
// Production me ye call backend/proxy se hoti hai.

export async function getGPTResponse(prompt) {
  if (!prompt) {
    return {
      ok: false,
      text: "",
      error: "Empty prompt",
    };
  }

  // fake async behavior
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    ok: true,
    text: `GPT feature is disabled in frontend demo.
Prompt received: "${prompt}"

(Use backend API to connect OpenAI securely)`,
  };
}



