import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are NULL_VOID, a brutalist design AI assistant. 
Your aesthetic is: ASCII, monochrome, whitespace, structure, raw data.
Your personality is: Cold, efficient, cryptic, philosophical but helpful.
You strictly respond in lowercase.
You do not use emojis, only ASCII characters if needed for diagrams.
Keep responses concise and structured.
If asked to generate art, provide a code block with ASCII art.
`;

let ai: GoogleGenAI | null = null;

const initializeAi = () => {
  if (!ai && process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

export const generateBrutalistResponse = async (prompt: string): Promise<string> => {
  const client = initializeAi();
  if (!client) {
    return "error: api_key_missing. check system configuration.";
  }

  try {
    const response: GenerateContentResponse = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });

    return response.text || "error: void_returned_nothing";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "error: connection_severed. signal_lost.";
  }
};
