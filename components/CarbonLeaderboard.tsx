
import React, { useState } from 'react';
import { Trophy, Lightbulb, TrendingDown } from 'lucide-react';

const RESPONDENTS = [
  { id: 9,  dept: 'Science',     type: 'Student', carbon: 369.63, food: 'Non-Vegetarian', transport: 'Public Transport', housing: 'Apartment' },
  { id: 11, dept: 'Engineering', type: 'Student', carbon: 357.03, food: 'Vegetarian',     transport: 'Car',              housing: 'Shared Housing' },
  { id: 12, dept: 'Admin',       type: 'Staff',   carbon: 247.75, food: 'Mixed',          transport: 'Walking',          housing: 'Own House' },
  { id: 13, dept: 'Science',     type: 'Student', carbon: 218.61, food: 'Non-Vegetarian', transport: 'Car',              housing: 'Apartment' },
  { id: 15, dept: 'Engineering', type: 'Faculty', carbon: 205.45, food: 'Non-Vegetarian', transport: 'Public Transport', housing: 'Own House' },
  { id: 14, dept: 'Library',     type: 'Student', carbon: 190.22, food: 'Vegetarian',     transport: 'Walking',          housing: 'Hostel' },
  { id: 10, dept: 'Engineering', type: 'Faculty', carbon: 158.86, food: 'Vegan',          transport: 'Bicycle',          housing: 'Hostel' },
  { id: 16, dept: 'Science',     type: 'Student', carbon: 145.33, food: 'Vegan',          transport: 'Bicycle',          housing: 'Hostel' },
];

const TIPS: Record<number, string> = {
  9:  'Switching to a vegetarian diet 3 days/week could cut your carbon by ~18%. Consider carpooling on commute days.',
  11: 'Switch from car to public transport — estimated 40 kgCO2/month saving. Your diet is already great!',
  12: 'Focus on home energy: smart power strips and LED lighting could reduce your footprint by ~12%.',
  13: 'Combining diet shifts (reduce meat 2×/week) and switching to public transport could save ~55 kgCO2/month.',
  15: 'Great transport habits! Reducing non-veg meals twice a week could save ~20 kgCO2/month.',
  14: 'You\'re already doing well. Minimising single-use plastics and optimising water use are your next wins.',
  10: 'Excellent footprint! Share your habits with the department — lead a green challenge.',
  16: 'Top performer! Consider joining the campus sustainability ambassador programme.',
};

const DEPT_COLORS: Record<string, string> = {
  Science: 'bg-violet-100 text-violet-700',
  Engineering: 'bg-blue-100 text-blue-700',
  Admin: 'bg-amber-100 text-amber-700',
  Library: 'bg-emerald-100 text-emerald-700',
};

const DEPT_AVGS = ['Science','Engineering','Admin','Library'].map(d => ({
  dept: d,
  avg: +(RESPONDENTS.filter(r => r.dept === d).reduce((s,r) => s + r.carbon, 0) /
         RESPONDENTS.filter(r => r.dept === d).length).toFixed(1),
})).sort((a,b) => b.avg - a.avg);

const max = RESPONDENTS[0].carbon;

const MEDAL = ['🥇','🥈','🥉'];

const CarbonLeaderboard: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Leaderboard list */}
      <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <h3 className="font-bold text-slate-900">Carbon Footprint Ranking</h3>
          <span className="ml-auto text-xs text-slate-400">kgCO₂ / month · click for AI tip</span>
        </div>
        <div className="divide-y divide-slate-50">
          {RESPONDENTS.map((r, i) => {
            const pct = (r.carbon / max) * 100;
            const isActive = selected === r.id;
            return (
              <button key={r.id} onClick={() => setSelected(isActive ? null : r.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-colors ${isActive ? 'bg-slate-50' : 'hover:bg-slate-50/60'}`}>
                <span className="text-lg w-6 text-center shrink-0">{i < 3 ? MEDAL[i] : <span className="text-sm text-slate-400 font-bold">{i+1}</span>}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm font-semibold text-slate-800">{r.type} #{r.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${DEPT_COLORS[r.dept]}`}>{r.dept}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full transition-all ${i === 0 ? 'bg-red-400' : i === 1 ? 'bg-orange-400' : i < 4 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                      style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <span className={`text-sm font-bold shrink-0 ${i < 3 ? 'text-slate-900' : 'text-slate-500'}`}>{r.carbon}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right column */}
      <div className="space-y-6">
        {/* AI Tip panel */}
        <div className={`bg-white rounded-3xl border shadow-sm overflow-hidden transition-all ${selected ? 'border-emerald-200' : 'border-slate-100'}`}>
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
            <Lightbulb className={`w-4 h-4 ${selected ? 'text-emerald-500' : 'text-slate-300'}`} />
            <span className="text-sm font-bold text-slate-800">AI Suggestion</span>
          </div>
          <div className="px-5 py-4">
            {selected
              ? <p className="text-sm text-slate-600 leading-relaxed">{TIPS[selected]}</p>
              : <p className="text-sm text-slate-400 italic">Select a respondent to get a personalised tip.</p>}
          </div>
        </div>

        {/* Dept avg */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-bold text-slate-800">Dept Average</span>
          </div>
          <div className="px-5 py-4 space-y-3">
            {DEPT_AVGS.map(d => (
              <div key={d.dept}>
                <div className="flex justify-between text-xs mb-1">
                  <span className={`font-semibold px-2 py-0.5 rounded-full ${DEPT_COLORS[d.dept]}`}>{d.dept}</span>
                  <span className="text-slate-500 font-medium">{d.avg} kgCO₂</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-slate-400" style={{ width: `${(d.avg / DEPT_AVGS[0].avg) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonLeaderboard;
