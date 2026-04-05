
import React, { useState, useEffect } from 'react';
import { Cpu, Zap, Droplets, Trash2, ShieldCheck, Activity, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const DECISIONS = [
  { id: 1, type: 'energy', title: 'HVAC Optimization', detail: 'Reducing load in Science Block B by 15% based on occupancy sensors.', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: 2, type: 'water', title: 'Leak Detection', detail: 'Pressure anomaly detected in Dorm 4. Autonomous shutoff valve engaged.', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 3, type: 'waste', title: 'Route Optimization', detail: 'Waste collection rerouted to prioritize high-capacity organic bins.', icon: Trash2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 4, type: 'security', title: 'System Integrity', detail: 'Safety protocols verified. All autonomous actions within ESG bounds.', icon: ShieldCheck, color: 'text-indigo-500', bg: 'bg-indigo-50' },
];

const LiveAgentFeed: React.FC<{ isAgenticMode: boolean }> = ({ isAgenticMode }) => {
  const [activeDecisions, setActiveDecisions] = useState(DECISIONS.slice(0, 2));

  useEffect(() => {
    if (!isAgenticMode) return;
    
    const interval = setInterval(() => {
      const nextIndex = Math.floor(Math.random() * DECISIONS.length);
      setActiveDecisions(prev => {
        const filtered = prev.filter(d => d.id !== DECISIONS[nextIndex].id);
        return [DECISIONS[nextIndex], ...filtered].slice(0, 3);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isAgenticMode]);

  if (!isAgenticMode) return null;

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
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Stream</span>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-hidden">
        <div className="mb-4 bg-slate-50 rounded-xl p-3 border border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Agent Thinking Process</span>
            <span className="text-[10px] font-mono text-slate-400">84% Complete</span>
          </div>
          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-indigo-600"
              initial={{ width: "0%" }}
              animate={{ width: ["10%", "40%", "35%", "80%", "75%", "100%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
        <AnimatePresence mode="popLayout">
          {activeDecisions.map((decision) => (
            <motion.div
              key={decision.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex gap-4 p-4 rounded-2xl border border-slate-50 hover:border-indigo-100 hover:shadow-md transition-all duration-300 bg-slate-50/50"
            >
              <div className={`${decision.bg} p-3 rounded-xl h-fit`}>
                <decision.icon className={`w-5 h-5 ${decision.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-bold text-slate-900 truncate">{decision.title}</h4>
                  <span className="text-[10px] text-slate-400 font-medium">Just now</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {decision.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 text-slate-400">
          <Terminal className="w-3 h-3" />
          <span className="text-[10px] font-mono">AGENT_LOG: Executing autonomous resource balancing...</span>
        </div>
      </div>
    </div>
  );
};

export default LiveAgentFeed;
