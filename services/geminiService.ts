
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const enhanceDescription = async (text: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Transform this professional description into a set of 3-5 punchy, achievement-oriented bullet points for a resume. Use strong action verbs. Input: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            bullets: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["bullets"]
        }
      }
    });

    const result = JSON.parse(response.text || '{"bullets": []}');
    return result.bullets;
  } catch (error) {
    console.error("Error enhancing description:", error);
    return [text];
  }
};

export const enhanceSummary = async (summary: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Rewrite this resume summary to be more professional, engaging, and modern. Keep it to one paragraph. Input: "${summary}"`
    });
    return response.text || summary;
  } catch (error) {
    console.error("Error enhancing summary:", error);
    return summary;
  }
};
