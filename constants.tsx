
import { DataPoint, BuildingData } from './types';

export const INITIAL_DATA: DataPoint[] = [
  { month: 'Jan', energy: 4200, water: 1200, waste: 450, carbon: 240 },
  { month: 'Feb', energy: 3800, water: 1100, waste: 420, carbon: 220 },
  { month: 'Mar', energy: 3950, water: 1300, waste: 480, carbon: 235 },
  { month: 'Apr', energy: 3500, water: 1250, waste: 410, carbon: 210 },
  { month: 'May', energy: 3200, water: 1400, waste: 400, carbon: 195 },
  { month: 'Jun', energy: 3000, water: 1550, waste: 380, carbon: 180 },
  { month: 'Jul', energy: 3100, water: 1600, waste: 390, carbon: 185 },
  { month: 'Aug', energy: 3200, water: 1580, waste: 405, carbon: 190 },
  { month: 'Sep', energy: 3500, water: 1450, waste: 430, carbon: 210 },
  { month: 'Oct', energy: 3900, water: 1350, waste: 460, carbon: 230 },
  { month: 'Nov', energy: 4100, water: 1200, waste: 480, carbon: 245 },
  { month: 'Dec', energy: 4400, water: 1150, waste: 500, carbon: 260 },
];

export const PREDICTED_DATA: DataPoint[] = [
  { month: 'Jan*', energy: 4100, water: 1100, waste: 440, carbon: 235, isPrediction: true },
  { month: 'Feb*', energy: 3700, water: 1050, waste: 410, carbon: 215, isPrediction: true },
  { month: 'Mar*', energy: 3800, water: 1200, waste: 460, carbon: 225, isPrediction: true },
];

export const BUILDING_STATS: BuildingData[] = [
  { id: '1', name: 'Engineering Block', energyUsage: 12500, waterUsage: 4500, wasteProduced: 1200, carbonFootprint: 850, efficiencyScore: 78 },
  { id: '2', name: 'Science Labs', energyUsage: 18200, waterUsage: 8200, wasteProduced: 2500, carbonFootprint: 1400, efficiencyScore: 62 },
  { id: '3', name: 'Student Dorms', energyUsage: 9400, waterUsage: 15000, wasteProduced: 3200, carbonFootprint: 750, efficiencyScore: 84 },
  { id: '4', name: 'Main Library', energyUsage: 4200, waterUsage: 2100, wasteProduced: 800, carbonFootprint: 320, efficiencyScore: 92 },
  { id: '5', name: 'Arts & Design', energyUsage: 7100, waterUsage: 3400, wasteProduced: 1500, carbonFootprint: 540, efficiencyScore: 71 },
];

export const COLORS = {
  energy: '#3b82f6',
  water: '#0ea5e9',
  waste: '#f59e0b',
  carbon: '#10b981',
  score: '#8b5cf6',
};
