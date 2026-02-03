
export interface DataPoint {
  month: string;
  energy: number;
  water: number;
  waste: number;
  carbon: number;
  isPrediction?: boolean;
}

export interface BuildingData {
  id: string;
  name: string;
  energyUsage: number;
  waterUsage: number;
  wasteProduced: number;
  carbonFootprint: number;
  efficiencyScore: number;
}

export interface SustainabilityReport {
  overallScore: number;
  totalCarbon: number;
  totalEnergy: number;
  totalWater: number;
  totalWaste: number;
  yearOverYearChange: number;
}

export type DashboardView = 'overview' | 'energy' | 'water-waste' | 'predictions' | 'admin';
