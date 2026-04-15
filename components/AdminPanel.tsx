
import React, { useState } from 'react';
import { Settings2, Play, RotateCcw, Database, Trophy } from 'lucide-react';
import DatabaseViewer from './DatabaseViewer';
import CarbonLeaderboard from './CarbonLeaderboard';

// ── Real DB averages (from energy_usage + carbon_emissions, Jan–Mar 2026) ──
const BASE = {
  monthlyEnergyKwh: 46520,   // campus avg monthly (139560 / 3)
  monthlyCarbonKg: 641.97,   // campus avg monthly (1925.9 / 3)
  monthlyWaterL:   653667,   // campus avg monthly (1961000 / 3)
  costPerKwh:      8,        // ₹ per kWh (India grid)
};

interface Scenario { solarCapacity: number; hvacEfficiency: number; occupancyRate: number; }

const AdminPanel: React.FC = () => {
  const [scenario, setScenario] = useState<Scenario>({ solarCapacity: 20, hvacEfficiency: 85, occupancyRate: 75 });
  const [simulating, setSimulating] = useState(false);
  const [tab, setTab] = useState<'simulation' | 'database' | 'leaderboard'>('simulation');

  const runSimulation = () => { setSimulating(true); setTimeout(() => setSimulating(false), 2000); };

  // Real projections
  const solarFraction   = scenario.solarCapacity / 100;
  const hvacGain        = (scenario.hvacEfficiency - 85) / 100;
  const occupancyFactor = scenario.occupancyRate / 100;
  const energySavedKwh  = BASE.monthlyEnergyKwh * (solarFraction * 0.55 + hvacGain * 0.3) * occupancyFactor;
  const yearlySaving    = Math.round(energySavedKwh * 12 * BASE.costPerKwh);
  const energyOffsetMwh = +(energySavedKwh * 12 / 1000).toFixed(1);
  const carbonReduction = +((energySavedKwh / BASE.monthlyEnergyKwh) * 100).toFixed(1);
  const waterSavedKL    = Math.round(BASE.monthlyWaterL * 0.004 * scenario.hvacEfficiency / 85 * 12 / 1000);

  const TABS = [
    { id: 'simulation',  label: 'Simulation',  Icon: Settings2 },
    { id: 'database',    label: 'View Database',Icon: Database  },
    { id: 'leaderboard', label: 'Leaderboard',  Icon: Trophy    },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
        {TABS.map(({ id, label, Icon }) => (
          <button key={id} onClick={() => setTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              tab === id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}>
            <Icon className="w-4 h-4" />{label}
          </button>
        ))}
      </div>

      {tab === 'database'    && <DatabaseViewer />}
      {tab === 'leaderboard' && <CarbonLeaderboard />}

      {tab === 'simulation' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <Settings2 className="w-5 h-5 text-slate-600" />
              <h3 className="text-xl font-bold text-slate-900">Simulation Controls</h3>
            </div>
            <div className="space-y-8">
              {[
                { label: 'Solar Adoption (%)',   key: 'solarCapacity',  min: 0,  max: 100, accent: 'accent-emerald-500', tc: 'text-emerald-600' },
                { label: 'HVAC Efficiency (%)',  key: 'hvacEfficiency', min: 50, max: 100, accent: 'accent-blue-500',    tc: 'text-blue-600'    },
                { label: 'Campus Occupancy (%)', key: 'occupancyRate',  min: 0,  max: 100, accent: 'accent-amber-500',  tc: 'text-amber-600'   },
              ].map(({ label, key, min, max, accent, tc }) => (
                <div key={key} className="space-y-4">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-slate-700">{label}</label>
                    <span className={`text-sm font-bold ${tc}`}>{scenario[key as keyof Scenario]}%</span>
                  </div>
                  <input type="range" min={min} max={max} value={scenario[key as keyof Scenario]}
                    onChange={e => setScenario({ ...scenario, [key]: +e.target.value })}
                    className={`w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer ${accent}`} />
                </div>
              ))}
              <div className="pt-2 p-3 bg-slate-50 rounded-xl text-xs text-slate-500 border border-slate-100">
                Based on real campus data — avg <strong className="text-slate-700">46,520 kWh/mo</strong> · <strong className="text-slate-700">642 kgCO₂/mo</strong>
              </div>
              <div className="flex gap-4 pt-2">
                <button onClick={runSimulation} disabled={simulating}
                  className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors disabled:opacity-50">
                  {simulating ? 'Computing...' : <><Play className="w-4 h-4" /> Run Analytics</>}
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
                <div className="text-4xl font-bold mb-2">
                  -{carbonReduction}% <span className="text-xl font-normal opacity-70">CO₂e reduction</span>
                </div>
                <p className="text-emerald-100 text-sm max-w-md">
                  Saving <strong>{energySavedKwh.toFixed(0)} kWh/mo</strong> from campus baseline of <strong>46,520 kWh</strong>.
                  Net Zero trajectory advances by ~{(carbonReduction / 10).toFixed(1)} years.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-700 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20" />
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-6">Projected Annual Savings</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: 'Cost Saving',    value: `₹${(yearlySaving/100000).toFixed(2)}L`,  color: 'text-emerald-600' },
                  { label: 'Energy Offset',  value: `${energyOffsetMwh} MWh`,                  color: 'text-blue-600'    },
                  { label: 'Water Saved',    value: `${waterSavedKL}k L`,                       color: 'text-sky-600'     },
                  { label: 'Carbon Cut',     value: `${(BASE.monthlyCarbonKg*12*carbonReduction/100).toFixed(0)} kg`, color: 'text-slate-900' },
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
