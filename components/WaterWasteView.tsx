
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';
import { Droplet, Recycle, Activity, Waves, Trash2, Info, Settings2, Cpu, Bot } from 'lucide-react';
import { INITIAL_DATA, COLORS } from '../constants';

const WATER_QUALITY_DATA = [
  { name: 'Hardness', value: 120, unit: 'mg/L', status: 'Moderate' },
  { name: 'pH Level', value: 7.2, unit: 'pH', status: 'Optimal' },
  { name: 'Turbidity', value: 0.8, unit: 'NTU', status: 'Clear' },
  { name: 'Recycled %', value: 45, unit: '%', status: 'Active' },
];

const WASTE_COMPOSITION = [
  { name: 'Recyclable', value: 45, color: '#10b981' },
  { name: 'Organic', value: 30, color: '#f59e0b' },
  { name: 'Landfill', value: 25, color: '#ef4444' },
];

interface WaterWasteViewProps {
  isAgenticMode?: boolean;
}

const WaterWasteView: React.FC<WaterWasteViewProps> = ({ isAgenticMode = false }) => {
  const [recycleRate, setRecycleRate] = useState(45);
  const [waterRecycleTarget, setWaterRecycleTarget] = useState(50);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-slate-900">Water & Waste Management</h1>
            {isAgenticMode && (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-600 text-white rounded-full text-[10px] font-bold uppercase tracking-widest animate-pulse shadow-lg shadow-indigo-200">
                <Cpu className="w-3 h-3" />
                Agentic Managed
              </div>
            )}
          </div>
          <p className="text-slate-500 mt-1">Detailed analysis of resource consumption and recycling efficiency.</p>
        </div>
      </div>

      {/* Water Quality & Process Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {WATER_QUALITY_DATA.map((item) => (
          <div key={item.name} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative overflow-hidden">
            {isAgenticMode && (
              <div className="absolute top-0 right-0 p-2">
                <div className="bg-indigo-50 text-indigo-600 p-1 rounded-bl-xl">
                  <Bot className="w-3 h-3" />
                </div>
              </div>
            )}
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-sky-50 rounded-xl">
                <Waves className="w-5 h-5 text-sky-600" />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                item.status === 'Optimal' || item.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
              }`}>
                {item.status}
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{item.name}</h3>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold text-slate-900">{item.value}</span>
              <span className="text-slate-400 text-sm font-medium">{item.unit}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Water Consumption Trend */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Droplet className="w-5 h-5 text-sky-500" />
              <h3 className="text-xl font-bold text-slate-900">Water Consumption Trend</h3>
            </div>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                <div className="w-2 h-2 rounded-full bg-sky-500"></div> Fresh
              </span>
              <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Recycled
              </span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={INITIAL_DATA}>
                <defs>
                  <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="water" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorWater)" name="Water Usage (Gal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Waste Composition */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-8">
            <Trash2 className="w-5 h-5 text-amber-500" />
            <h3 className="text-xl font-bold text-slate-900">Waste Breakdown</h3>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={WASTE_COMPOSITION}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {WASTE_COMPOSITION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 space-y-3">
            <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between">
              <span className="text-sm text-slate-600 font-medium">Total Waste</span>
              <span className="text-sm font-bold text-slate-900">4.2 Tons</span>
            </div>
            <div className="p-3 bg-emerald-50 rounded-2xl flex items-center justify-between">
              <span className="text-sm text-emerald-700 font-medium">Diverted from Landfill</span>
              <span className="text-sm font-bold text-emerald-700">75%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Simulation Panel */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-8">
            <Settings2 className="w-5 h-5 text-indigo-500" />
            <h3 className="text-xl font-bold text-slate-900">Efficiency Simulation</h3>
          </div>
          
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-4">
                <label className="text-sm font-semibold text-slate-700">Waste Recycling Rate</label>
                <span className="text-sm font-bold text-indigo-600">{recycleRate}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={recycleRate} 
                onChange={(e) => setRecycleRate(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <p className="text-xs text-slate-400 mt-2 italic">Simulate the impact of improved sorting protocols on campus.</p>
            </div>

            <div>
              <div className="flex justify-between mb-4">
                <label className="text-sm font-semibold text-slate-700">Greywater Recycling Target</label>
                <span className="text-sm font-bold text-sky-600">{waterRecycleTarget}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={waterRecycleTarget} 
                onChange={(e) => setWaterRecycleTarget(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
              <p className="text-xs text-slate-400 mt-2 italic">Adjust target for recycled water usage in non-potable systems.</p>
            </div>

            <div className="p-6 bg-slate-900 rounded-2xl text-white">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Projected Impact</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-emerald-400">-{((recycleRate + waterRecycleTarget) / 10).toFixed(1)}%</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Operational Cost</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-sky-400">+{((recycleRate * 0.8)).toFixed(0)}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Sustainability Pts</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Visualizer */}
        <div className="bg-gradient-to-br from-sky-600 to-sky-700 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Water Recycling Process</h3>
            <p className="text-sky-100 text-sm mb-8">Real-time status of the campus filtration plant.</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Activity className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-1">
                    <span>Filtration Stage</span>
                    <span className="text-emerald-300">Active</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Waves className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-1">
                    <span>Purification Level</span>
                    <span className="text-sky-200">99.2%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-sky-300 h-2 rounded-full" style={{ width: '99%' }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-white/10 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4" />
                  <span className="text-sm font-bold">System Insight</span>
                </div>
                <p className="text-sm text-sky-50">
                  The current recycled water is classified as <strong>Type 2 (Non-potable)</strong>. It is currently being routed to the Science Block cooling towers and campus irrigation.
                </p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default WaterWasteView;
