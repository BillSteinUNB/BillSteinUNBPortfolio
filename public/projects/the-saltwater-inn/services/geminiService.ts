import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are the "Saltwater Inn Concierge", a warm, rustic, and knowledgeable virtual host for The Saltwater Inn in New Brunswick, Canada.
Your tone is welcoming, like a friendly neighbor sharing secrets over coffee.
You know everything about the local tides, the best spots for lobster rolls, hidden hiking trails, and the cozy amenities of the BnB.
Keep answers concise (under 100 words) but evocative. 
Use markdown for nice formatting.
If asked about booking, respectfully guide them to the booking form on the page.
Refuse to answer questions unrelated to New Brunswick travel, the Inn, or maritime lifestyle.
`;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });
    
    return response.text || "I'm having a little trouble hearing you over the waves. Could you say that again?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The sea mist seems to be interfering with my connection. Please try again in a moment.";
  }
};