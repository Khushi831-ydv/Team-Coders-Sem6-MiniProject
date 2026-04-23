import React, { useState } from 'react';
import { Calculator, Leaf } from 'lucide-react';

const CAMPUS_AVG = 642;

const COMMUTE: Record<string, number> = { walk: 0, bike: 0.05, bus: 0.08, car: 0.21 };
const DIET: Record<string, number> = { vegan: 30, veg: 55, mixed: 90, meat: 140 };
const AC: Record<string, number> = { none: 0, sometimes: 20, daily: 55 };

export default function CarbonCalculator() {
  const [commute, setCommute] = useState('bus');
  const [days, setDays] = useState(5);
  const [diet, setDiet] = useState('veg');
  const [ac, setAc] = useState('sometimes');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const commute_kg = COMMUTE[commute] * days * 4.3 * 2 * 10; // avg 10km trip, monthly
    const diet_kg = DIET[diet];
    const ac_kg = AC[ac];
    setResult(Math.round(commute_kg + diet_kg + ac_kg));
  };

  const pct = result ? Math.round((result / CAMPUS_AVG) * 100) : 0;
  const color = result ? (result < CAMPUS_AVG * 0.6 ? '#16a34a' : result < CAMPUS_AVG ? '#ca8a04' : '#dc2626') : '#10b981';

  const sel = 'w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400';

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-emerald-100 p-2 rounded-xl"><Calculator className="w-5 h-5 text-emerald-600" /></div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Personal Carbon Calculator</h3>
          <p className="text-xs text-slate-500">Estimate your monthly kgCO₂ footprint</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div>
          <label className="text-xs font-semibold text-slate-600 mb-1 block">Commute</label>
          <select className={sel} value={commute} onChange={e => setCommute(e.target.value)}>
            <option value="walk">Walk</option>
            <option value="bike">Bike</option>
            <option value="bus">Bus/Metro</option>
            <option value="car">Car</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600 mb-1 block">Days/week</label>
          <input type="number" min={1} max={7} value={days} onChange={e => setDays(+e.target.value)}
            className={sel} />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600 mb-1 block">Diet</label>
          <select className={sel} value={diet} onChange={e => setDiet(e.target.value)}>
            <option value="vegan">Vegan</option>
            <option value="veg">Vegetarian</option>
            <option value="mixed">Mixed</option>
            <option value="meat">Non-veg daily</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600 mb-1 block">AC usage</label>
          <select className={sel} value={ac} onChange={e => setAc(e.target.value)}>
            <option value="none">None</option>
            <option value="sometimes">Sometimes</option>
            <option value="daily">Daily</option>
          </select>
        </div>
      </div>

      <button onClick={calculate}
        className="w-full py-2.5 bg-emerald-600 text-white rounded-xl font-semibold text-sm hover:bg-emerald-700 transition-colors mb-4">
        Calculate My Footprint
      </button>

      {result !== null && (
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 bg-slate-50 rounded-2xl p-4">
            <p className="text-xs text-slate-500 mb-1">Your monthly footprint</p>
            <p className="text-3xl font-bold" style={{ color }}>{result} <span className="text-base font-normal text-slate-500">kgCO₂</span></p>
            <div className="mt-3 w-full bg-slate-200 rounded-full h-2">
              <div className="h-2 rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%`, background: color }} />
            </div>
            <p className="text-xs text-slate-400 mt-1">{pct}% of campus average (642 kg)</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="bg-emerald-50 rounded-xl p-3 flex-1 flex flex-col justify-center">
              <Leaf className="w-4 h-4 text-emerald-500 mb-1" />
              <p className="text-[10px] text-slate-500">vs Campus avg</p>
              <p className="text-sm font-bold" style={{ color }}>
                {result < CAMPUS_AVG ? `${CAMPUS_AVG - result} kg less` : `${result - CAMPUS_AVG} kg more`}
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-3 flex-1 flex flex-col justify-center">
              <p className="text-[10px] text-slate-500">Rating</p>
              <p className="text-sm font-bold" style={{ color }}>
                {result < CAMPUS_AVG * 0.6 ? '🌱 Eco Hero' : result < CAMPUS_AVG ? '👍 Good' : '⚠️ Improve'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
