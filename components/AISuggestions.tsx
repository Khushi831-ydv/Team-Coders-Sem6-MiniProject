
import React, { useEffect, useState } from 'react';
import { getSustainabilityInsights, getAgenticRAGInsights } from '../services/geminiService';
import { INITIAL_DATA, BUILDING_STATS } from '../constants';
import { Sparkles, CheckCircle2, ArrowRight, Bot, Zap, ShieldCheck, RefreshCw, Globe, Cpu } from 'lucide-react';

interface Insight {
  category: string;
  observation: string;
  recommendation: string;
  estimatedImpact: string;
  priority: 'High' | 'Medium' | 'Low';
}

interface RAGStrategy {
  title: string;
  description: string;
  alignment: string;
  agentAction: string;
}

interface AISuggestionsProps {
  isAgenticMode?: boolean;
}

const AISuggestions: React.FC<AISuggestionsProps> = ({ isAgenticMode = false }) => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [ragStrategies, setRagStrategies] = useState<RAGStrategy[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAutopilotOn, setIsAutopilotOn] = useState(false);
  const [agentLogs] = useState([
    { id: 1, action: 'Optimized HVAC in Sci-Block', time: '2m ago', result: '-12% Load' },
    { id: 2, action: 'Rerouted Solar to Dorms', time: '15m ago', result: 'Grid Offset' },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [ins, rag] = await Promise.all([
        getSustainabilityInsights(INITIAL_DATA, BUILDING_STATS),
        isAgenticMode ? getAgenticRAGInsights(INITIAL_DATA, BUILDING_STATS) : Promise.resolve([])
      ]);
      setInsights(ins);
      setRagStrategies(rag);
      setLoading(false);
    };
    fetchData();
  }, [isAgenticMode]);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm animate-pulse">
          <div className="h-6 bg-slate-100 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-24 bg-slate-50 rounded-2xl"></div>
            <div className="h-24 bg-slate-50 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Agentic Autopilot Hub - Only visible in Agentic Mode */}
      {isAgenticMode && (
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden animate-in zoom-in duration-500">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Agentic Autopilot</h3>
                  <p className="text-indigo-100 text-xs">Autonomous Resource Orchestration</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAutopilotOn(!isAutopilotOn)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  isAutopilotOn ? 'bg-emerald-400' : 'bg-white/20'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAutopilotOn ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-100">AI Reasoning</span>
                </div>
                <p className="text-sm font-medium">{isAutopilotOn ? 'Active Analysis' : 'Standby'}</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-100">Safety Guard</span>
                </div>
                <p className="text-sm font-medium">Verified</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 mb-2">Recent Agent Actions</p>
              {agentLogs.map(log => (
                <div key={log.id} className="flex items-center justify-between text-xs bg-black/10 p-2 rounded-lg">
                  <span className="flex items-center gap-2">
                    <RefreshCw className={`w-3 h-3 ${isAutopilotOn ? 'animate-spin' : ''}`} />
                    {log.action}
                  </span>
                  <span className="text-emerald-300 font-bold">{log.result}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      )}

      {/* RAG-Driven Global Alignment - Only visible in Agentic Mode */}
      {isAgenticMode && ragStrategies.length > 0 && (
        <div className="bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 shadow-xl animate-in slide-in-from-right-4 duration-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-emerald-500/20 p-2 rounded-xl">
              <Globe className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Global SDG Alignment</h3>
              <p className="text-slate-400 text-[10px] uppercase tracking-widest">RAG-Driven Orchestration</p>
            </div>
          </div>

          <div className="space-y-4">
            {ragStrategies.map((strat, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors group">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-emerald-400 text-sm group-hover:text-emerald-300 transition-colors">{strat.title}</h4>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
                    {strat.alignment.split(':')[0]}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mb-3 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                  {strat.description}
                </p>
                <div className="flex items-center gap-2 bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                  <Cpu className="w-3 h-3 text-emerald-400" />
                  <span className="text-[10px] text-emerald-200 font-mono italic truncate">
                    {strat.agentAction}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Standard Insights — horizontal row */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-100 p-2 rounded-xl">
            <Sparkles className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">AI Advisor</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.map((insight, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden bg-slate-50 border border-slate-100 rounded-2xl p-4 hover:bg-white hover:border-emerald-200 hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                    insight.priority === 'High' ? 'bg-rose-100 text-rose-600' : insight.priority === 'Medium' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                  }`}>
                    {insight.priority}
                  </span>
                  <span className="text-slate-400 text-xs font-medium">{insight.category}</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <h4 className="text-slate-900 font-bold text-sm mb-1 leading-tight">{insight.recommendation}</h4>
              <p className="text-slate-500 text-[11px] mb-3 leading-relaxed flex-1">{insight.observation}</p>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200 border-dashed">
                <span className="text-[10px] font-bold text-emerald-700">Impact: {insight.estimatedImpact}</span>
                <button className="text-[10px] font-bold text-slate-800 flex items-center gap-1 group-hover:text-emerald-600 transition-colors">
                  Plan <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AISuggestions;
