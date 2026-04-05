
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
    return [];
  }
};

export const getAgenticRAGInsights = async (data: DataPoint[], buildings: BuildingData[]) => {
  const prompt = `
    As an Autonomous Sustainability Agent, analyze this campus data in the context of global sustainability goals:
    Historical Trends: ${JSON.stringify(data.slice(-3))}
    Building Breakdown: ${JSON.stringify(buildings)}

    Using the provided URL context (UN Sustainable Development Goals), identify how this campus can align its autonomous resource orchestration with global standards.
    Provide 3 high-level agentic strategies.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      config: {
        tools: [{ urlContext: { } }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            strategies: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  alignment: { type: Type.STRING, description: "How this aligns with UN SDGs" },
                  agentAction: { type: Type.STRING, description: "The autonomous action the agent will take" }
                },
                required: ['title', 'description', 'alignment', 'agentAction']
              }
            }
          },
          required: ['strategies']
        }
      },
      // Providing the UN SDGs URL as context
      contents: [
        { parts: [{ text: "https://sdgs.un.org/goals" }] },
        { parts: [{ text: prompt }] }
      ]
    } as any); // Using any because urlContext might not be fully typed in the SDK version

    return JSON.parse(response.text).strategies;
  } catch (error) {
    console.error("Gemini RAG Error:", error);
    return [
      {
        title: "Autonomous Grid Balancing",
        description: "Aligning campus energy consumption with real-time renewable availability.",
        alignment: "SDG 7: Affordable and Clean Energy",
        agentAction: "Agent will autonomously throttle non-critical HVAC loads during low solar output periods."
      },
      {
        title: "Circular Waste Orchestration",
        description: "Automating the lifecycle of campus materials to ensure zero-waste-to-landfill.",
        alignment: "SDG 12: Responsible Consumption and Production",
        agentAction: "Agent will trigger autonomous collection alerts when recycling bins reach 80% capacity."
      }
    ];
  }
};
