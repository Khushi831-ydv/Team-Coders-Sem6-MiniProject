
import React from 'react';
import { Zap, Droplet, Recycle, Wind, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface CardProps {
  title: string;
  value: string;
  unit: string;
  change: number;
  icon: React.ElementType;
  color: string;
}

const DashboardCard: React.FC<CardProps> = ({ title, value, unit, change, icon: Icon, color }) => {
  const isPositive = change > 0;
  
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${color} bg-opacity-10`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
          isPositive ? 'text-rose-600 bg-rose-50' : 'text-emerald-600 bg-emerald-50'
        }`}>
          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {Math.abs(change)}%
        </div>
      </div>
      <div>
        <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-2xl font-bold text-slate-900">{value}</span>
          <span className="text-slate-400 text-sm font-medium">{unit}</span>
        </div>
      </div>
    </div>
  );
};

export const DashboardCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <DashboardCard
        title="Energy Consumption"
        value="4,240"
        unit="kWh"
        change={-4.2}
        icon={Zap}
        color="bg-blue-500"
      />
      <DashboardCard
        title="Water Usage"
        value="1,150"
        unit="Gallons"
        change={2.1}
        icon={Droplet}
        color="bg-sky-500"
      />
      <DashboardCard
        title="Waste Diverted"
        value="82"
        unit="%"
        change={-1.5}
        icon={Recycle}
        color="bg-amber-500"
      />
      <DashboardCard
        title="Carbon Footprint"
        value="260"
        unit="CO2e"
        change={-8.4}
        icon={Wind}
        color="bg-emerald-500"
      />
    </div>
  );
};
