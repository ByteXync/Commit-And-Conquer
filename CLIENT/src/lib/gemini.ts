import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCLzWWQOLDUcUAAn4ZAxbwaSG5Srp5DsDU");

export async function checkContentSensitivity(content: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `
      Analyze the following blog content for any sensitive, inappropriate, or offensive material.
      Respond with a JSON object containing:
      - isSafe: boolean (true if content is safe, false if potentially problematic)
      - reason: string (explanation if content is flagged as unsafe)
      
      Content to analyze:
      ${content}
    `;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    try {
      const parsedResponse = JSON.parse(response);
      return parsedResponse;
    } catch (e) {
      // If response isn't valid JSON, assume it's unsafe
      return {
        isSafe: false,
        reason: "Could not verify content safety"
      };
    }
  } catch (error) {
    console.error("Error checking content sensitivity:", error);
    throw new Error("Failed to check content sensitivity");
  }
}
