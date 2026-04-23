
import React from 'react';
import { Cpu, Zap, Droplets, Trash2, ShieldCheck, Terminal, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Ticket } from '../types';

const FALLBACK = [
  { id: 'f1', icon: Zap,           color: 'text-amber-500',   bg: 'bg-amber-50',    title: 'HVAC Optimization',  location: 'Science Block B', action: 'Reducing load by 15% based on occupancy sensors.', severity: 'Medium', status: 'In Progress', created_at: new Date(Date.now() - 2 * 60000).toISOString() },
  { id: 'f2', icon: Droplets,      color: 'text-blue-500',    bg: 'bg-blue-50',     title: 'Leak Detection',     location: 'Dorm 4',          action: 'Pressure anomaly detected. Autonomous shutoff valve engaged.', severity: 'High', status: 'Acknowledged', created_at: new Date(Date.now() - 15 * 60000).toISOString() },
  { id: 'f3', icon: Trash2,        color: 'text-emerald-500', bg: 'bg-emerald-50',  title: 'Route Optimization', location: 'Waste Bay C',     action: 'Waste collection rerouted to high-capacity organic bins.', severity: 'Low', status: 'Resolved', created_at: new Date(Date.now() - 40 * 60000).toISOString() },
  { id: 'f4', icon: ShieldCheck,   color: 'text-indigo-500',  bg: 'bg-indigo-50',   title: 'System Integrity',   location: 'Campus-wide',     action: 'Safety protocols verified. All autonomous actions within ESG bounds.', severity: 'Low', status: 'Resolved', created_at: new Date(Date.now() - 60 * 60000).toISOString() },
];

const ISSUE_CONFIG = {
  Water:       { icon: Droplets,      color: 'text-blue-500',    bg: 'bg-blue-50',    action: 'Autonomous shutoff valve alert triggered. Maintenance team notified.' },
  Electricity: { icon: Zap,           color: 'text-amber-500',   bg: 'bg-amber-50',   action: 'Grid load isolation initiated. Electrical safety check dispatched.' },
  Waste:       { icon: Trash2,        color: 'text-emerald-500', bg: 'bg-emerald-50', action: 'Waste collection rerouted. Overflow bins flagged for priority pickup.' },
  General:     { icon: AlertTriangle, color: 'text-slate-500',   bg: 'bg-slate-100',  action: 'Campus operations team alerted. Inspection task created.' },
};

const SEVERITY_LABEL: Record<string, string> = {
  Critical: '🔴 Critical',
  High:     '🟠 High',
  Medium:   '🟡 Medium',
  Low:      '🟢 Low',
};

function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

const LiveAgentFeed: React.FC<{ isAgenticMode: boolean; tickets: Ticket[] }> = ({ isAgenticMode, tickets }) => {
  if (!isAgenticMode) return null;

  const ticketDecisions = [...tickets].slice(0, 4).map(t => {
    const cfg = ISSUE_CONFIG[t.issue_type];
    return { id: String(t.id), icon: cfg.icon, color: cfg.color, bg: cfg.bg, title: `${t.issue_type} Issue`, location: t.location || 'Campus', action: cfg.action, severity: t.severity, status: t.status, created_at: t.created_at };
  });
  const recentTickets = ticketDecisions.length > 0
    ? [...ticketDecisions, ...FALLBACK].slice(0, 4)
    : FALLBACK;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <Cpu className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Live Agent Decisions</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live · {tickets.length} Reports</span>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto">
        {/* Agent thinking bar */}
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Agent Processing</span>
            <span className="text-[10px] font-mono text-slate-400">{tickets.length} issue{tickets.length !== 1 ? 's' : ''} analysed</span>
          </div>
          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-indigo-600"
              initial={{ width: '0%' }}
              animate={{ width: ['10%', '40%', '35%', '80%', '75%', '100%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>

        {recentTickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <ShieldCheck className="w-8 h-8 text-emerald-400 mb-2" />
            <p className="text-sm font-semibold text-slate-700">No active reports</p>
            <p className="text-xs text-slate-400 mt-1">Submit an EcoSnap report to trigger agent decisions</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {recentTickets.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex gap-3 p-4 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:shadow-md transition-all duration-300 bg-slate-50/50"
                >
                  <div className={`${item.bg} p-2.5 rounded-xl h-fit flex-shrink-0`}>
                    <Icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className="text-sm font-bold text-slate-900 truncate">
                        {item.title} — {item.location}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-medium ml-2 flex-shrink-0">{timeAgo(item.created_at)}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mb-1.5">{item.action}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">
                        {SEVERITY_LABEL[item.severity]}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' :
                        item.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>{item.status}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 text-slate-400">
          <Terminal className="w-3 h-3" />
          <span className="text-[10px] font-mono">
            AGENT_LOG: {tickets.length > 0 ? `Processing ${tickets.length} report(s) — last updated ${timeAgo(tickets[0]?.created_at)}` : 'Monitoring campus systems...'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LiveAgentFeed;
