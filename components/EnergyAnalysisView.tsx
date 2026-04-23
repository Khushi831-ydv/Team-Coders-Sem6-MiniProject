
import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie, Legend, AreaChart, Area
} from 'recharts';
import { Zap, Sun, Wind, Battery, Thermometer, Info, Settings2, Lightbulb, Activity, Cpu, Bot, X, LayoutGrid } from 'lucide-react';
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

const BLOCKS = [
  {
    name: 'Block A',
    image: 'https://images.unsplash.com/photo-1541888086225-ee5b99118e97?auto=format&fit=crop&q=80&w=800',
    mainSource: 'Grid Power',
    icon: 'zap',
    stats: [
      { label: 'Grid Power', value: '320 kW' },
      { label: 'Solar PV', value: '120 kW (380 panels)' },
      { label: 'Lighting Load', value: '85 kW (LED)' },
      { label: 'HVAC Load', value: '140 kW' },
      { label: 'Backup Battery', value: '50 kWh' },
    ],
    total: '~ 445 kW',
    renewable: '27%',
  },
  {
    name: 'Block B',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
    mainSource: 'Mixed',
    icon: 'sun',
    stats: [
      { label: 'Solar PV', value: '95 kW (300 panels)' },
      { label: 'Solar Water Heater', value: '25 kW eq.' },
      { label: 'Grid Power', value: '210 kW' },
      { label: 'Lighting + Fan', value: '75 kW' },
      { label: 'Wastewater Reuse', value: '40,000 L/day' },
    ],
    total: '~ 305 kW',
    renewable: '31%',
  },
  {
    name: 'Block C',
    image: 'https://images.unsplash.com/photo-1562516155-e0d1b4b5e8b1?auto=format&fit=crop&q=80&w=800',
    mainSource: 'Transport & Grid',
    icon: 'zap',
    stats: [
      { label: 'CNG Buses', value: '180 kg/day' },
      { label: 'EV Charging', value: '60 kW' },
      { label: 'Battery Storage', value: '120 kWh' },
      { label: 'Diesel Backup', value: '30 L/day' },
      { label: 'Grid Power', value: '140 kW' },
    ],
    total: '~ 200–250 kW',
    renewable: '22%',
  },
  {
    name: 'Block D',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    mainSource: 'Renewable Heavy',
    icon: 'sun',
    stats: [
      { label: 'Waste-to-Energy', value: '50 kW output' },
      { label: 'STP', value: '60,000 L/day' },
      { label: 'Solar Microgrid', value: '150 kW (480 panels)' },
      { label: 'Wind', value: '20 kW' },
      { label: 'Battery Storage', value: '80 kWh' },
    ],
    total: '~ 220 kW',
    renewable: '~70%',
  },
];

interface EnergyAnalysisViewProps {
  isAgenticMode?: boolean;
}

const EnergyAnalysisView: React.FC<EnergyAnalysisViewProps> = ({ isAgenticMode = false }) => {
  const [ledConversion, setLedConversion] = useState(65);
  const [hvacOptimization, setHvacOptimization] = useState(40);
  const [showBlocks, setShowBlocks] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
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

        <button
          onClick={() => setShowBlocks(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 hover:text-indigo-600 transition-all shadow-sm font-medium whitespace-nowrap"
        >
          <LayoutGrid className="w-4 h-4" />
          Block-wise Energy Source
        </button>
      </div>

      {/* Block-wise Modal */}
      {showBlocks && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowBlocks(false)}>
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Block-wise Energy Source</h2>
                <p className="text-slate-500 mt-1 text-sm">Detailed breakdown of energy sources across campus blocks.</p>
              </div>
              <button onClick={() => setShowBlocks(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BLOCKS.map((block, idx) => (
                <div key={idx} className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:border-indigo-100 group flex flex-col shadow-sm">
                  <div className="h-40 w-full relative overflow-hidden bg-slate-200">
                    <img src={block.image} alt={block.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-lg text-slate-700 shadow-sm">
                      {block.mainSource}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-5">
                      <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">{block.name}</h3>
                      <div className={`p-2 rounded-xl shadow-sm ${block.icon === 'sun' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                        {block.icon === 'sun' ? <Sun className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                      </div>
                    </div>
                    <div className="space-y-2.5 mb-6 flex-1">
                      {block.stats.map((stat, i) => (
                        <div key={i} className="flex justify-between items-center py-1.5 border-b border-slate-50 last:border-0">
                          <span className="text-sm font-medium text-slate-500">{stat.label}</span>
                          <span className="text-sm font-bold text-slate-700">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-5 border-t border-slate-100 flex justify-between items-end mt-auto">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Total Usage</p>
                        <p className="text-lg font-black text-slate-900">{block.total}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-wider font-bold text-emerald-500 mb-1">Clean Energy</p>
                        <p className="text-sm font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md inline-block border border-emerald-100">{block.renewable}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Key Energy Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Zap, bg: 'bg-blue-50', color: 'text-blue-600', badge: 'Stable', badgeBg: 'bg-emerald-50 text-emerald-600', label: 'Current Demand', value: '842', unit: 'kW', agentic: true },
          { icon: Sun, bg: 'bg-amber-50', color: 'text-amber-600', badge: 'Peak Sun', badgeBg: 'bg-amber-50 text-amber-600', label: 'Solar Generation', value: '245', unit: 'kW', agentic: true },
          { icon: Battery, bg: 'bg-emerald-50', color: 'text-emerald-600', badge: 'Charging', badgeBg: 'bg-blue-50 text-blue-600', label: 'Storage Level', value: '82', unit: '%', agentic: false },
          { icon: Thermometer, bg: 'bg-rose-50', color: 'text-rose-600', badge: 'High Load', badgeBg: 'bg-rose-50 text-rose-600', label: 'HVAC Intensity', value: '42', unit: '%', agentic: false },
        ].map(({ icon: Icon, bg, color, badge, badgeBg, label, value, unit, agentic }, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative overflow-hidden">
            {isAgenticMode && agentic && (
              <div className="absolute top-0 right-0 p-2">
                <div className="bg-indigo-50 text-indigo-600 p-1 rounded-bl-xl"><Bot className="w-3 h-3" /></div>
              </div>
            )}
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 ${bg} rounded-xl`}><Icon className={`w-5 h-5 ${color}`} /></div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${badgeBg}`}>{badge}</span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{label}</h3>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold text-slate-900">{value}</span>
              <span className="text-slate-400 text-sm font-medium">{unit}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-8">
            <Activity className="w-5 h-5 text-blue-500" />
            <h3 className="text-xl font-bold text-slate-900">Daily Load Profile</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PEAK_LOAD_DATA}>
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="load" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorLoad)" name="Load (kW)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-8">
            <Wind className="w-5 h-5 text-emerald-500" />
            <h3 className="text-xl font-bold text-slate-900">Energy Mix</h3>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={ENERGY_SOURCES} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {ENERGY_SOURCES.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
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
              <input type="range" min="0" max="100" value={ledConversion} onChange={e => setLedConversion(+e.target.value)} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
              <p className="text-xs text-slate-400 mt-2 italic">Percentage of campus lighting upgraded to high-efficiency LED.</p>
            </div>
            <div>
              <div className="flex justify-between mb-4">
                <label className="text-sm font-semibold text-slate-700">HVAC Smart Optimization</label>
                <span className="text-sm font-bold text-blue-600">{hvacOptimization}%</span>
              </div>
              <input type="range" min="0" max="100" value={hvacOptimization} onChange={e => setHvacOptimization(+e.target.value)} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              <p className="text-xs text-slate-400 mt-2 italic">Implementation of AI-driven climate control systems.</p>
            </div>
            <div className="p-6 bg-slate-900 rounded-2xl text-white">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Simulated Annual Savings</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-emerald-400">₹{((ledConversion * 1200) + (hvacOptimization * 3500)).toLocaleString()}</p>
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

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Smart Grid Status</h3>
            <p className="text-slate-400 text-sm mb-8">Live feed from the campus microgrid controller.</p>
            <div className="space-y-6">
              {[
                { icon: Lightbulb, color: 'text-amber-400', label: 'Lighting Load', status: 'Normal', statusColor: 'text-slate-400', pct: '45%', barColor: 'bg-amber-400' },
                { icon: Thermometer, color: 'text-blue-400', label: 'HVAC Load', status: 'High', statusColor: 'text-rose-400', pct: '78%', barColor: 'bg-blue-400' },
              ].map(({ icon: Icon, color, label, status, statusColor, pct, barColor }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Icon className={`w-6 h-6 ${color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-1">
                      <span>{label}</span><span className={statusColor}>{status}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className={`${barColor} h-2 rounded-full`} style={{ width: pct }} />
                    </div>
                  </div>
                </div>
              ))}
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
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
};

export default EnergyAnalysisView;
