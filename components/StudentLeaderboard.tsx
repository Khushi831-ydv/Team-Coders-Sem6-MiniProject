import React from 'react';
import { Trophy } from 'lucide-react';
import { Ticket } from '../types';

const MEDALS = ['🥇', '🥈', '🥉'];
const COLORS = ['bg-amber-50 border-amber-200', 'bg-slate-50 border-slate-200', 'bg-orange-50 border-orange-200'];

export default function StudentLeaderboard({ tickets, currentUserEmail }: { tickets: Ticket[]; currentUserEmail: string }) {
  const counts: Record<string, number> = {};
  tickets.forEach(t => {
    if (t.created_by && t.created_by !== 'anonymous')
      counts[t.created_by] = (counts[t.created_by] || 0) + 1;
  });

  const ranked = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-amber-100 p-2 rounded-xl"><Trophy className="w-5 h-5 text-amber-600" /></div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Eco Reporter Leaderboard</h3>
          <p className="text-xs text-slate-500">Top students by EcoSnap reports submitted</p>
        </div>
      </div>

      {ranked.length === 0 ? (
        <p className="text-slate-400 text-sm text-center py-6">No reports yet — be the first to submit an EcoSnap!</p>
      ) : (
        <div className="space-y-2">
          {ranked.map(([email, count], i) => (
            <div key={email}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${COLORS[i] ?? 'bg-slate-50 border-slate-100'} ${email === currentUserEmail ? 'ring-2 ring-emerald-400' : ''}`}>
              <span className="text-xl w-7 text-center">{MEDALS[i] ?? `#${i + 1}`}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">
                  {email === currentUserEmail ? `${email} (You)` : email}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-emerald-600">{count}</p>
                <p className="text-[10px] text-slate-400">reports</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-[11px] text-slate-400 text-center mt-4">Submit EcoSnap reports to climb the leaderboard</p>
    </div>
  );
}
