
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

export type DashboardView = 'overview' | 'energy' | 'water-waste' | 'predictions' | 'admin' | 'reports';

export type UserRole = 'student' | 'faculty' | 'admin';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  images: string[];
  sourceLink?: string;
  createdAt: string;
}

export interface AuthUser {
  email: string;
  role: UserRole;
}

export type EcoSnapIssueType = 'Leak' | 'Lights ON waste' | 'Broken panel' | 'Waste overflow';
export type EcoSnapSeverity  = 'Low' | 'Medium' | 'High' | 'Critical';

export interface EcoSnapCreateRequest {
  image: File;
  location?: string;
  note?: string;
}

export interface EcoSnapTicket {
  id: number;
  image_url: string;
  issue_type: EcoSnapIssueType;
  severity: EcoSnapSeverity;
  location: string;
  note: string;
  alert_triggered: boolean;
  created_at: string;
}

export type TicketIssueType = 'Water' | 'Electricity' | 'Waste' | 'General';
export type TicketSeverity  = 'Low' | 'Medium' | 'High' | 'Critical';
export type TicketStatus    = 'Unseen' | 'Acknowledged' | 'In Progress' | 'Resolved';

export interface TicketCreateRequest {
  image: File;
  location?: string;
  description?: string;
  created_by?: string;
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
  created_by: string;
}
