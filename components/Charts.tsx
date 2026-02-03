
import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { INITIAL_DATA, BUILDING_STATS, COLORS } from '../constants';

export const MainOverviewChart: React.FC = () => {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={INITIAL_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.carbon} stopOpacity={0.1}/>
              <stop offset="95%" stopColor={COLORS.carbon} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.energy} stopOpacity={0.1}/>
              <stop offset="95%" stopColor={COLORS.energy} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 12 }} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', borderRadius: '16px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Area 
            type="monotone" 
            dataKey="carbon" 
            stroke={COLORS.carbon} 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorCarbon)" 
            name="Carbon (tCO2e)"
          />
          <Area 
            type="monotone" 
            dataKey="energy" 
            stroke={COLORS.energy} 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorEnergy)" 
            name="Energy (kWh)"
            hide
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const BuildingEfficiencyChart: React.FC = () => {
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={BUILDING_STATS} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
          <XAxis type="number" hide />
          <YAxis 
            dataKey="name" 
            type="category" 
            axisLine={false} 
            tickLine={false}
            width={120}
            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
          />
          <Tooltip 
             cursor={{ fill: 'transparent' }}
             contentStyle={{ borderRadius: '12px' }}
          />
          <Bar dataKey="efficiencyScore" radius={[0, 8, 8, 0]} barSize={24} name="Efficiency Score (%)">
            {BUILDING_STATS.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.efficiencyScore > 80 ? COLORS.carbon : entry.efficiencyScore > 70 ? COLORS.energy : COLORS.waste} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const PredictionChart: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: '12px' }} />
          <Line 
            type="monotone" 
            dataKey="carbon" 
            stroke={COLORS.carbon} 
            strokeWidth={3} 
            dot={{ r: 4, fill: COLORS.carbon }}
            activeDot={{ r: 8 }}
            strokeDasharray={(v: any) => v.payload.isPrediction ? "5 5" : "0"}
          />
          <Line 
            type="monotone" 
            dataKey="energy" 
            stroke={COLORS.energy} 
            strokeWidth={2}
            strokeDasharray="5 5"
            hide
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
