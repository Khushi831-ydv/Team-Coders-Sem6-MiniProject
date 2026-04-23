import solar1 from "../assets/solar/img14jpeg.jpeg";
import solar2 from "../assets/solar/img16jpeg.jpeg";
import solar3 from "../assets/solar/img18jpeg.jpeg";

import waste1 from "../assets/waste/img11jpeg.jpeg";
import waste2 from "../assets/waste/img12jpeg.jpeg";
import waste3 from "../assets/waste/img15jpeg.jpeg";
import waste4 from "../assets/waste/img17jpeg.jpeg";

import water1 from "../assets/water/img1.jpeg";
import water2 from "../assets/water/img4jpeg.jpeg";
import water3 from "../assets/water/img5jpeg.jpeg";
import water4 from "../assets/water/img6jpeg.jpeg";
import water5 from "../assets/water/img7jpeg.jpeg";
import water6 from "../assets/water/img8jpeg.jpeg";
import water7 from "../assets/water/img9jpeg.jpeg";
import water8 from "../assets/water/img13jpeg.jpeg";

export const chatbotImageMap = {
  solar: [solar1, solar2, solar3],
  waste: [waste1, waste2, waste3, waste4],
  water: [water1, water2, water3, water4, water5, water6, water7, water8],
};

const solarKeywords = ["solar", "solar panel", "panels", "renewable", "energy", "rooftop"];
const wasteKeywords = ["waste", "trash", "garbage", "bin", "overflow", "recycle"];
const waterKeywords = ["water", "leak", "pipe", "pipeline", "tank", "drain", "drainage"];

export function findRelevantImages(query: string): string[] {
  const lower = query.toLowerCase();
  if (solarKeywords.some((k) => lower.includes(k))) return chatbotImageMap.solar.slice(0, 3);
  if (wasteKeywords.some((k) => lower.includes(k))) return chatbotImageMap.waste.slice(0, 3);
  if (waterKeywords.some((k) => lower.includes(k))) return chatbotImageMap.water.slice(0, 3);
  return [];
}
