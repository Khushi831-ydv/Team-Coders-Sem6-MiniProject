import { DataPoint, BuildingData } from '../types';

export const getSustainabilityInsights = async (_data: DataPoint[], _buildings: BuildingData[]) => {
  return [
    {
      category: 'Energy',
      observation: 'Science Labs consume 18,200 kWh/month — 39% of total campus energy — with an efficiency score of only 62%.',
      recommendation: 'Install occupancy-based lighting controls and upgrade lab HVAC scheduling in Science Labs.',
      estimatedImpact: '~18% energy reduction, saving ₹1.6L/year',
      priority: 'High' as const,
    },
    {
      category: 'Carbon',
      observation: 'Campus emits ~642 kgCO₂/month. Dec–Jan peak is 44% above the June low due to heating loads.',
      recommendation: 'Deploy smart thermostats with AI scheduling to cut winter heating demand by 12%.',
      estimatedImpact: '~76 kgCO₂/month reduction, advancing Net Zero by 0.8 years',
      priority: 'High' as const,
    },
    {
      category: 'Water',
      observation: 'Student Dorms use 15,000 L/month — highest of all buildings — yet have the best efficiency score (84%).',
      recommendation: 'Add low-flow fixtures and greywater recycling in dorms to maintain efficiency while cutting usage.',
      estimatedImpact: '~22% water savings, ₹40K/year cost reduction',
      priority: 'Medium' as const,
    },
  ];
};

export const getAgenticRAGInsights = async (_data: DataPoint[], _buildings: BuildingData[]) => {
  return [
    {
      title: 'Autonomous Grid Balancing',
      description: 'Aligning campus energy consumption with real-time renewable availability using predictive load shifting.',
      alignment: 'SDG 7: Affordable and Clean Energy',
      agentAction: 'Agent will autonomously throttle non-critical HVAC loads during low solar output periods.',
    },
    {
      title: 'Circular Waste Orchestration',
      description: 'Automating the lifecycle of campus materials to ensure zero-waste-to-landfill outcomes.',
      alignment: 'SDG 12: Responsible Consumption and Production',
      agentAction: 'Agent triggers autonomous collection alerts when recycling bins reach 80% capacity.',
    },
    {
      title: 'Carbon-Aware Scheduling',
      description: 'Shifting high-energy lab operations to off-peak hours when grid carbon intensity is lowest.',
      alignment: 'SDG 13: Climate Action',
      agentAction: 'Agent reschedules non-urgent lab equipment cycles to 02:00–06:00 low-carbon windows.',
    },
  ];
};
