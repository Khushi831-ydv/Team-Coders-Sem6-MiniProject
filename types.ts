
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

export type TicketIssueType = 'Water' | 'Electricity' | 'Waste' | 'General';
export type TicketSeverity  = 'Low' | 'Medium' | 'High' | 'Critical';
export type TicketStatus    = 'Unseen' | 'Acknowledged' | 'In Progress' | 'Resolved';

export interface TicketCreateRequest {
  image: File;
  location?: string;
  description?: string;
}

export interface Ticket {
  id: number;
  image_url: string;
  issue_type: TicketIssueType;
  severity: TicketSeverity;
  status: TicketStatus;
  description: string;
  location: string;
  created_at: string;
}
