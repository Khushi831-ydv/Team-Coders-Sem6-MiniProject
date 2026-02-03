
import React from 'react';
import { LayoutDashboard, Zap, Droplets, TrendingUp, Settings, Leaf, BarChart3 } from 'lucide-react';
import { DashboardView } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: DashboardView;
  setActiveView: (view: DashboardView) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView }) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'energy', label: 'Energy Analysis', icon: Zap },
    { id: 'water-waste', label: 'Water & Waste', icon: Droplets },
    { id: 'predictions', label: 'AI Predictions', icon: TrendingUp },
    { id: 'admin', label: 'Admin Panel', icon: Settings },
  ] as const;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-emerald-500 p-2 rounded-lg">
            <Leaf className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">GreenAudit</h1>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeView === item.id
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-900 rounded-2xl p-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Campus Status</span>
            </div>
            <p className="text-sm font-medium">Sustainability: 84%</p>
            <div className="w-full bg-slate-700 rounded-full h-1.5 mt-2">
              <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '84%' }}></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">
            {navItems.find(i => i.id === activeView)?.label || 'Dashboard'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-900">Khushi Yadav</p>
              <p className="text-xs text-slate-500">Admin</p>
            </div>
            <img
              src="https://picsum.photos/seed/admin/100/100"
              alt="User"
              className="w-10 h-10 rounded-full ring-2 ring-emerald-100"
            />
          </div>
        </header>
        
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
