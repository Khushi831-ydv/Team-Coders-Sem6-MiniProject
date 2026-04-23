import { findRelevantImages } from "../constants/chatbotAssets";

type ChatbotReply = { text: string; images: string[] };

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

function buildSystemPrompt(userMessage: string) {
  return `You are an AI Campus Assistant for a sustainability project called GreenAudit.
Answer campus sustainability questions clearly. Focus on solar panels, water systems, waste, recycling, leaks, drainage, and renewable energy. Keep replies concise and practical. If unsure, say "Based on the available campus assets and sustainability setup..."

User question: ${userMessage}`;
}

function fallbackLocalAnswer(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("solar") || lower.includes("renewable") || lower.includes("energy"))
    return "The campus uses solar panel infrastructure as one of its visible renewable energy sources. Relevant rooftop solar images have been attached for reference.";
  if (lower.includes("waste") || lower.includes("trash") || lower.includes("recycle"))
    return "The campus waste system includes bins, disposal areas, and waste-handling points. Relevant waste-related images have been attached.";
  if (lower.includes("water") || lower.includes("leak") || lower.includes("pipe") || lower.includes("drain"))
    return "The campus water system includes pipes, tanks, drainage paths, and possible leak-prone points. Relevant images have been attached.";
  return "The campus assistant can help with questions about solar infrastructure, water systems, waste management, and related environmental resources.";
}

export async function getCampusAssistantReply(userMessage: string): Promise<ChatbotReply> {
  const images = findRelevantImages(userMessage);

  if (!GEMINI_API_KEY) {
    return { text: fallbackLocalAnswer(userMessage), images };
  }

  try {
    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: buildSystemPrompt(userMessage) }] }] }),
    });
    if (!response.ok) throw new Error("API error");
    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || fallbackLocalAnswer(userMessage);
    return { text, images };
  } catch {
    return { text: fallbackLocalAnswer(userMessage), images };
  }
}
