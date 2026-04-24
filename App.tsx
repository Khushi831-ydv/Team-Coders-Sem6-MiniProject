
import React, { useEffect, useState } from 'react';
import Layout from './components/Layout';
import LoginPage from './components/LoginPage';
import { DashboardCards } from './components/DashboardCards';
import { MainOverviewChart, BuildingEfficiencyChart, PredictionChart } from './components/Charts';
import AISuggestions from './components/AISuggestions';
import AdminPanel from './components/AdminPanel';
import WaterWasteView from './components/WaterWasteView';
import EnergyAnalysisView from './components/EnergyAnalysisView';
import LiveAgentFeed from './components/LiveAgentFeed';
import EcoSnap from './components/EcoSnap';
import SustainabilityReports from './components/SustainabilityReports';
import FloatingChatbot from './components/FloatingChatbot';
import CarbonCalculator from './components/CarbonCalculator';
import StudentLeaderboard from './components/StudentLeaderboard';
import TicketList from './components/TicketList';
import { DashboardView, AuthUser, Ticket, TicketIssueType, TicketStatus } from './types';
import { INITIAL_DATA, PREDICTED_DATA } from './constants';
import { fetchTickets, updateTicket, deleteTicket } from './services/ticketService';
import { Leaf, Info, Cpu, ShieldCheck, Zap, BookOpen, GraduationCap, Download, Share2, Check } from 'lucide-react';
import { BUILDING_STATS } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [activeView, setActiveView] = useState<DashboardView>('overview');
  const [isAgenticMode, setIsAgenticMode] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    fetchTickets().then(setTickets).catch(() => {});
  }, []);

  const handleLogin = (authUser: AuthUser) => {
    setUser(authUser);
    setActiveView('overview');
  };

  const handleLogout = () => {
    setUser(null);
    setActiveView('overview');
    setIsAgenticMode(false);
  };

  const [copied, setCopied] = useState(false);

  const handleDownloadReport = () => {
    const rows = [
      ['GreenAudit Campus Sustainability Report'],
      [`Generated: ${new Date().toLocaleString()}`],
      [''],
      ['=== Monthly Energy & Carbon Data ==='],
      ['Month', 'Energy (kWh)', 'Water (kL)', 'Waste (kg)', 'Carbon (tCO2e)'],
      ...INITIAL_DATA.map(d => [d.month, d.energy, d.water, d.waste, d.carbon]),
      [''],
      ['=== Building Efficiency Rankings ==='],
      ['Building', 'Energy (kWh)', 'Water (L)', 'Waste (kg)', 'Carbon (kg)', 'Efficiency Score'],
      ...BUILDING_STATS.map(b => [b.name, b.energyUsage, b.waterUsage, b.wasteProduced, b.carbonFootprint, `${b.efficiencyScore}%`]),
      [''],
      ['=== Maintenance Tickets ==='],
      ['ID', 'Issue Type', 'Severity', 'Status', 'Location', 'Raised By', 'Created At'],
      ...tickets.map(t => [t.id, t.issue_type, t.severity, t.status, t.location || 'N/A', t.created_by, new Date(t.created_at).toLocaleString()]),
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `greenaudit-report-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      prompt('Copy this link:', url);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUpdateTicket = async (id: number, updates: { issue_type?: TicketIssueType; status?: TicketStatus }) => {
    try {
      const updated = await updateTicket(id, updates);
      setTickets(prev => prev.map(t => t.id === id ? updated : t));
    } catch {}
  };

  const handleDeleteTicket = async (id: number) => {
    await deleteTicket(id);
    setTickets(prev => prev.filter(t => t.id !== id));
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Campus Overview</h1>
                <p className="text-slate-500 mt-1">Real-time sustainability metrics across all faculties.</p>
              </div>
              {user.role === 'student' && (
                <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 border border-blue-100 rounded-xl text-blue-700 text-sm font-medium">
                  <GraduationCap className="w-4 h-4 flex-shrink-0" />
                  You have read-only access to campus overview data.
                </div>
              )}
              {user.role !== 'student' && (
                <div className="flex gap-2">
                  <button onClick={handleDownloadReport} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                    <Download className="w-4 h-4" /> Download Report
                  </button>
                  <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors">
                    {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Share2 className="w-4 h-4" /> Share Dashboard</>}
                  </button>
                </div>
              )}
            </div>

            <DashboardCards />

            {isAgenticMode && user.role !== 'student' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-top-4 duration-500">
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl p-4 text-white shadow-lg flex items-center gap-4">
                  <div className="bg-white/20 p-2 rounded-xl">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">Agent Reasoning</p>
                    <p className="text-lg font-bold">98.4% Accuracy</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-4 text-white shadow-lg flex items-center gap-4">
                  <div className="bg-white/20 p-2 rounded-xl">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-200">Safety Compliance</p>
                    <p className="text-lg font-bold">100% Verified</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-4 text-white shadow-lg flex items-center gap-4">
                  <div className="bg-white/20 p-2 rounded-xl">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-amber-100">Live Optimization</p>
                    <p className="text-lg font-bold">Active (14 Nodes)</p>
                  </div>
                </div>
              </div>
            )}

            {user.role !== 'student' && (
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-slate-900">Carbon Intensity Trend</h3>
                  <select className="bg-slate-50 border-none text-slate-500 text-sm font-medium rounded-lg focus:ring-emerald-500">
                    <option>Last 12 Months</option>
                    <option>Last Quarter</option>
                    <option>Year to Date</option>
                  </select>
                </div>
                <div className="h-[300px]">
                  <MainOverviewChart />
                </div>
              </div>
            )}

            {user.role === 'student' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CarbonCalculator />
                <StudentLeaderboard tickets={tickets} currentUserEmail={user.email} />
              </div>
            )}

            <AISuggestions isAgenticMode={isAgenticMode && user.role !== 'student'} />

            {isAgenticMode && user.role !== 'student' && (
              <div className="h-[400px] animate-in slide-in-from-left-4 duration-700">
                <LiveAgentFeed isAgenticMode={isAgenticMode} tickets={tickets} />
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 mb-8">
                  <Leaf className="w-5 h-5 text-emerald-500" />
                  <h3 className="text-xl font-bold text-slate-900">Building Efficiency Ranking</h3>
                </div>
                <BuildingEfficiencyChart />
              </div>
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Net Zero Progress</h3>
                    <p className="text-slate-400 text-sm mb-8">Current trajectory vs Goal 2030</p>
                    <div className="flex items-center gap-8 mb-8">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-emerald-400">62%</p>
                        <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Reduction</p>
                      </div>
                      <div className="h-12 w-px bg-slate-700"></div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-blue-400">1.2k</p>
                        <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Trees Offset</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Target reached</span>
                      <span className="font-bold">62% / 100%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3">
                      <div className="bg-emerald-400 h-3 rounded-full" style={{ width: '62%' }}></div>
                    </div>
                    <p className="text-xs text-slate-500 italic flex items-center gap-1">
                      <Info className="w-3 h-3" /> Updated 14 minutes ago
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl"></div>
              </div>
            </div>

            {/* Eco-Snap Maintenance Reporting */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900">Eco-Snap Maintenance Reporting</h3>
                <span className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-sm font-semibold">
                  {tickets.length} Tickets
                </span>
              </div>
              <EcoSnap onTicketCreated={(t: Ticket) => setTickets((prev: Ticket[]) => [t, ...prev])} userEmail={user.email} />
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <TicketList tickets={tickets} currentUserEmail={user.email} onUpdateTicket={handleUpdateTicket} onDeleteTicket={user.role === 'admin' ? handleDeleteTicket : undefined} />
            </div>

            {user.role === 'student' && (
              <div className="flex items-start gap-3 p-5 bg-blue-50 border border-blue-100 rounded-2xl text-blue-800 text-sm">
                <BookOpen className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-500" />
                <div>
                  <p className="font-semibold mb-0.5">Student View — Read Only</p>
                  <p className="text-blue-600 text-xs leading-relaxed">
                    You can view campus sustainability data on this Overview page.
                    Energy Analysis, Water &amp; Waste, AI Predictions, and Admin tools are available to Faculty and Administrators only.
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      case 'predictions':
        return (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-bold text-slate-900">Predictive Analytics</h1>
              <p className="text-slate-500 mt-2">
                Our AI models use historical consumption patterns to forecast future environmental impact and identify seasonal anomalies.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-8">Carbon Forecast (Next 6 Months)</h3>
              <PredictionChart data={[...INITIAL_DATA, ...PREDICTED_DATA]} />
              <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3 items-start">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <p className="text-sm text-blue-800">
                  <strong>Trend Insight:</strong> We predict a 12% spike in energy consumption in Dec* due to expected colder winter conditions. Implementing localized smart thermostats could mitigate this by up to 5%.
                </p>
              </div>
            </div>
          </div>
        );
      case 'admin':
        return (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-bold text-slate-900">Admin Strategy Sandbox</h1>
              <p className="text-slate-500 mt-2">
                Simulate various sustainability initiatives to see their hypothetical impact on campus carbon footprints and operational costs.
              </p>
            </div>
            <AdminPanel />
          </div>
        );
      case 'energy':
        return <EnergyAnalysisView isAgenticMode={isAgenticMode} />;
      case 'water-waste':
        return <WaterWasteView isAgenticMode={isAgenticMode} />;
      case 'reports':
        return <SustainabilityReports userRole={user.role} />;
      default:
        return <div>View not implemented</div>;
    }
  };

  return (
    <>
      <Layout
        activeView={activeView}
        setActiveView={setActiveView}
        isAgenticMode={isAgenticMode}
        setIsAgenticMode={setIsAgenticMode}
        user={user}
        onLogout={handleLogout}
      >
        {renderContent()}
      </Layout>
      <FloatingChatbot />
    </>
  );
};

export default App;
