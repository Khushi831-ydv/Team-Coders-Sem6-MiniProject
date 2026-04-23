import { findRelevantImages, detectTopic } from "../constants/chatbotAssets";

type ChatbotReply = { text: string; images: string[]; sourceLink?: string };

const SOURCE_LINKS: Record<string, string> = {
  solar: "https://www.krmangalam.edu.in/pdfs/sustainable/solar-write-up.pdf",
  waste:  "https://www.krmangalam.edu.in/centre-for-sustainable-development-goals",
  water:  "https://www.krmangalam.edu.in/centre-for-sustainable-development-goals",
};

// Vite injects import.meta.env at build time; cast to avoid TS error in non-Vite tsconfig
const GEMINI_API_KEY: string = (import.meta as any).env?.VITE_GEMINI_API_KEY ?? "";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

function buildSystemPrompt(userMessage: string) {
  return `You are an AI Campus Assistant for a sustainability project called GreenAudit at K.R. Mangalam University.
Answer campus sustainability questions clearly. Focus on solar panels, water systems, waste, recycling, leaks, drainage, and renewable energy. Keep replies concise and practical.

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
  const topic = detectTopic(userMessage);
  const sourceLink = topic ? SOURCE_LINKS[topic] : undefined;

  if (!GEMINI_API_KEY) {
    return { text: fallbackLocalAnswer(userMessage), images, sourceLink };
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
    return { text, images, sourceLink };
  } catch {
    return { text: fallbackLocalAnswer(userMessage), images, sourceLink };
  }
}
