
import React, { useState } from 'react';
import { Settings2, Play, RotateCcw, Database } from 'lucide-react';
import DatabaseViewer from './DatabaseViewer';

interface Scenario { solarCapacity: number; hvacEfficiency: number; occupancyRate: number; }

const AdminPanel: React.FC = () => {
  const [scenario, setScenario] = useState<Scenario>({ solarCapacity: 20, hvacEfficiency: 85, occupancyRate: 75 });
  const [simulating, setSimulating] = useState(false);
  const [tab, setTab] = useState<'simulation' | 'database'>('simulation');

  const runSimulation = () => { setSimulating(true); setTimeout(() => setSimulating(false), 2000); };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
        {(['simulation', 'database'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
              tab === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}>
            {t === 'simulation' ? <Settings2 className="w-4 h-4" /> : <Database className="w-4 h-4" />}
            {t === 'database' ? 'View Database' : 'Simulation'}
          </button>
        ))}
      </div>

      {tab === 'database' && <DatabaseViewer />}

      {tab === 'simulation' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <Settings2 className="w-5 h-5 text-slate-600" />
              <h3 className="text-xl font-bold text-slate-900">Simulation Controls</h3>
            </div>
            <div className="space-y-8">
              {[
                { label: 'Solar Adoption (%)', key: 'solarCapacity', min: 0, max: 100, color: 'accent-emerald-500', textColor: 'text-emerald-600' },
                { label: 'HVAC Efficiency (%)', key: 'hvacEfficiency', min: 50, max: 100, color: 'accent-blue-500', textColor: 'text-blue-600' },
                { label: 'Campus Occupancy (%)', key: 'occupancyRate', min: 0, max: 100, color: 'accent-amber-500', textColor: 'text-amber-600' },
              ].map(({ label, key, min, max, color, textColor }) => (
                <div key={key} className="space-y-4">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-slate-700">{label}</label>
                    <span className={`text-sm font-bold ${textColor}`}>{scenario[key as keyof Scenario]}%</span>
                  </div>
                  <input type="range" min={min} max={max} value={scenario[key as keyof Scenario]}
                    onChange={e => setScenario({ ...scenario, [key]: parseInt(e.target.value) })}
                    className={`w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer ${color}`} />
                </div>
              ))}
              <div className="flex gap-4 pt-4">
                <button onClick={runSimulation} disabled={simulating}
                  className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors disabled:opacity-50">
                  {simulating ? 'Processing...' : <><Play className="w-4 h-4" /> Run Analytics</>}
                </button>
                <button onClick={() => setScenario({ solarCapacity: 20, hvacEfficiency: 85, occupancyRate: 75 })}
                  className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors">
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-emerald-900 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-2">Projected Impact</h4>
                <div className="text-4xl font-bold mb-4">
                  -{(scenario.solarCapacity * 0.4 + (scenario.hvacEfficiency - 85) * 1.2).toFixed(1)}%{' '}
                  <span className="text-xl font-normal opacity-70">CO2e reduction</span>
                </div>
                <p className="text-emerald-100 max-w-md">
                  Based on your configuration, the campus would reach Net Zero emissions approximately 2.4 years earlier than the baseline prediction.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-700 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20" />
            </div>
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-6">Simulation Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: 'Yearly Cost Saving', value: '$42,500', color: 'text-emerald-600' },
                  { label: 'Energy Offset', value: '320 MWh', color: 'text-blue-600' },
                  { label: 'Water Recovery', value: '12k Gal', color: 'text-sky-600' },
                  { label: 'ROI Period', value: '18 Months', color: 'text-slate-900' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="space-y-1">
                    <p className="text-slate-500 text-xs">{label}</p>
                    <p className={`text-lg font-bold ${color}`}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
