
import React, { useEffect, useState } from 'react';
import { Sparkles, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { getSustainabilityInsights } from '../services/geminiService';
import { INITIAL_DATA, BUILDING_STATS } from '../constants';

interface Insight {
  category: string;
  observation: string;
  recommendation: string;
  estimatedImpact: string;
  priority: 'High' | 'Medium' | 'Low';
}

const AISuggestions: React.FC = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      const res = await getSustainabilityInsights(INITIAL_DATA, BUILDING_STATS);
      setInsights(res);
      setLoading(false);
    };
    fetchInsights();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm animate-pulse">
        <div className="h-6 bg-slate-100 rounded w-1/4 mb-6"></div>
        <div className="space-y-4">
          <div className="h-24 bg-slate-50 rounded-2xl"></div>
          <div className="h-24 bg-slate-50 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-purple-100 p-2 rounded-xl">
          <Sparkles className="w-5 h-5 text-purple-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">AI Sustainability Advisor</h3>
      </div>

      <div className="grid gap-4">
        {insights.map((insight, idx) => (
          <div 
            key={idx} 
            className="group relative overflow-hidden bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:bg-white hover:border-emerald-200 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                  insight.priority === 'High' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'
                }`}>
                  {insight.priority} Priority
                </span>
                <span className="text-slate-400 text-sm font-medium">{insight.category}</span>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <p className="text-slate-900 font-semibold mb-1">{insight.recommendation}</p>
            <p className="text-slate-500 text-sm mb-4">{insight.observation}</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 border-dashed">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-medium text-emerald-700">Impact: {insight.estimatedImpact}</span>
              </div>
              <button className="text-xs font-bold text-slate-800 flex items-center gap-1 group-hover:text-emerald-600">
                Implement Plan <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AISuggestions;
