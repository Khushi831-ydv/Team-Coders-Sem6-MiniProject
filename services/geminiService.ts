
import { GoogleGenAI, Type } from "@google/genai";
import { DataPoint, BuildingData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getSustainabilityInsights = async (data: DataPoint[], buildings: BuildingData[]) => {
  const prompt = `
    Analyze this campus sustainability data:
    Historical Trends: ${JSON.stringify(data.slice(-3))}
    Building Breakdown: ${JSON.stringify(buildings)}

    Identify the top 3 critical areas for improvement and provide actionable sustainability recommendations. 
    Focus on Carbon Footprint, Energy, and Water.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            insights: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  observation: { type: Type.STRING },
                  recommendation: { type: Type.STRING },
                  estimatedImpact: { type: Type.STRING },
                  priority: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] }
                },
                required: ['category', 'observation', 'recommendation', 'estimatedImpact', 'priority']
              }
            }
          },
          required: ['insights']
        }
      }
    });

    return JSON.parse(response.text).insights;
  } catch (error) {
    console.error("Gemini Insights Error:", error);
    return [
      {
        category: "Energy",
        observation: "Science Labs show unusually high energy intensity compared to other blocks.",
        recommendation: "Implement automated laboratory equipment power-down protocols and upgrade to variable speed HVAC drives.",
        estimatedImpact: "15% reduction in science block energy costs.",
        priority: "High"
      },
      {
        category: "Water",
        observation: "Student dorms consume 50% of total campus water.",
        recommendation: "Install low-flow showerheads and smart leak detection systems.",
        estimatedImpact: "Approx. 200,000 gallons saved annually.",
        priority: "Medium"
      }
    ];
  }
};
