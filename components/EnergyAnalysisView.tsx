
import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, PieChart, Pie, Legend, AreaChart, Area
} from 'recharts';
import { Zap, Sun, Wind, Battery, Thermometer, Info, Settings2, Lightbulb, Activity, Cpu, Bot } from 'lucide-react';
import { INITIAL_DATA, COLORS } from '../constants';

const ENERGY_SOURCES = [
  { name: 'Grid Power', value: 55, color: '#3b82f6' },
  { name: 'Solar PV', value: 30, color: '#f59e0b' },
  { name: 'Wind', value: 15, color: '#10b981' },
];

const PEAK_LOAD_DATA = [
  { time: '00:00', load: 120 },
  { time: '04:00', load: 110 },
  { time: '08:00', load: 450 },
  { time: '12:00', load: 820 },
  { time: '16:00', load: 780 },
  { time: '20:00', load: 350 },
  { time: '23:59', load: 150 },
];

interface EnergyAnalysisViewProps {
  isAgenticMode?: boolean;
}

const EnergyAnalysisView: React.FC<EnergyAnalysisViewProps> = ({ isAgenticMode = false }) => {
  const [ledConversion, setLedConversion] = useState(65);
  const [hvacOptimization, setHvacOptimization] = useState(40);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-slate-900">Energy Analysis</h1>
            {isAgenticMode && (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-600 text-white rounded-full text-[10px] font-bold uppercase tracking-widest animate-pulse shadow-lg shadow-indigo-200">
                <Cpu className="w-3 h-3" />
                Agentic Managed
              </div>
            )}
          </div>
          <p className="text-slate-500 mt-1">Real-time monitoring of power consumption and renewable integration.</p>
        </div>
      </div>

      {/* Key Energy Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative overflow-hidden">
          {isAgenticMode && (
            <div className="absolute top-0 right-0 p-2">
              <div className="bg-indigo-50 text-indigo-600 p-1 rounded-bl-xl">
                <Bot className="w-3 h-3" />
              </div>
            </div>
          )}
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-50 rounded-xl">
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-emerald-50 text-emerald-600">
              Stable
            </span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Current Demand</h3>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold text-slate-900">842</span>
            <span className="text-slate-400 text-sm font-medium">kW</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative overflow-hidden">
          {isAgenticMode && (
            <div className="absolute top-0 right-0 p-2">
              <div className="bg-indigo-50 text-indigo-600 p-1 rounded-bl-xl">
                <Bot className="w-3 h-3" />
              </div>
            </div>
          )}
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-amber-50 rounded-xl">
              <Sun className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-amber-50 text-amber-600">
              Peak Sun
            </span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Solar Generation</h3>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold text-slate-900">245</span>
            <span className="text-slate-400 text-sm font-medium">kW</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-50 rounded-xl">
              <Battery className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-blue-50 text-blue-600">
              Charging
            </span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Storage Level</h3>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold text-slate-900">82</span>
            <span className="text-slate-400 text-sm font-medium">%</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-rose-50 rounded-xl">
              <Thermometer className="w-5 h-5 text-rose-600" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-rose-50 text-rose-600">
              High Load
            </span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">HVAC Intensity</h3>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold text-slate-900">42</span>
            <span className="text-slate-400 text-sm font-medium">%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Load Profile */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" />
              <h3 className="text-xl font-bold text-slate-900">Daily Load Profile</h3>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PEAK_LOAD_DATA}>
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="load" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorLoad)" name="Load (kW)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Energy Mix */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-8">
            <Wind className="w-5 h-5 text-emerald-500" />
            <h3 className="text-xl font-bold text-slate-900">Energy Mix</h3>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ENERGY_SOURCES}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {ENERGY_SOURCES.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
            <div className="flex items-center gap-2 mb-1">
              <Sun className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-bold text-emerald-700">Renewable Share: 45%</span>
            </div>
            <p className="text-xs text-emerald-600">Campus is currently running on 45% clean energy.</p>
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
                <label className="text-sm font-semibold text-slate-700">LED Lighting Conversion</label>
                <span className="text-sm font-bold text-indigo-600">{ledConversion}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={ledConversion} 
                onChange={(e) => setLedConversion(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <p className="text-xs text-slate-400 mt-2 italic">Percentage of campus lighting upgraded to high-efficiency LED.</p>
            </div>

            <div>
              <div className="flex justify-between mb-4">
                <label className="text-sm font-semibold text-slate-700">HVAC Smart Optimization</label>
                <span className="text-sm font-bold text-blue-600">{hvacOptimization}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={hvacOptimization} 
                onChange={(e) => setHvacOptimization(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <p className="text-xs text-slate-400 mt-2 italic">Implementation of AI-driven climate control systems.</p>
            </div>

            <div className="p-6 bg-slate-900 rounded-2xl text-white">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Simulated Annual Savings</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-emerald-400">${((ledConversion * 1200) + (hvacOptimization * 3500)).toLocaleString()}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Cost Reduction</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-400">-{((ledConversion * 0.15) + (hvacOptimization * 0.25)).toFixed(1)}%</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Carbon Impact</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Grid Status */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Smart Grid Status</h3>
            <p className="text-slate-400 text-sm mb-8">Live feed from the campus microgrid controller.</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-amber-400" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-1">
                    <span>Lighting Load</span>
                    <span className="text-slate-400">Normal</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-amber-400 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Thermometer className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-1">
                    <span>HVAC Load</span>
                    <span className="text-rose-400">High</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-bold">Grid Intelligence</span>
                </div>
                <p className="text-sm text-slate-300">
                  The microgrid is currently prioritizing <strong>Solar PV</strong> output. Battery storage is discharging to offset peak demand in the Science Labs.
                </p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default EnergyAnalysisView;
