
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export interface MealAnalysis {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  description: string;
}

export const analyzeMealWithAI = async (query: string): Promise<MealAnalysis | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this meal and provide estimated nutritional values: "${query}". Return only valid JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            calories: { type: Type.NUMBER },
            protein: { type: Type.NUMBER },
            carbs: { type: Type.NUMBER },
            fats: { type: Type.NUMBER },
            description: { type: Type.STRING }
          },
          required: ["calories", "protein", "carbs", "fats", "description"]
        }
      }
    });
    
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Meal analysis failed:", error);
    return null;
  }
};

/**
 * Calculates Basal Metabolic Rate using Mifflin-St Jeor Equation
 */
export const calculateBMR = (weight: number, height: number, age: number, isMale: boolean = true) => {
  if (isMale) {
    return (10 * weight) + (6.25 * height) - (5 * age) + 5;
  }
  return (10 * weight) + (6.25 * height) - (5 * age) - 161;
};

/**
 * Total Daily Energy Expenditure (TDEE) based on activity multiplier (1.2 - 1.9)
 */
export const calculateTDEE = (bmr: number, multiplier: number = 1.375) => {
  return Math.round(bmr * multiplier);
};
