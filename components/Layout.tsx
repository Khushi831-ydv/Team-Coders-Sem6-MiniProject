import React from 'react';
import { LayoutDashboard, Zap, Droplets, TrendingUp, Settings, Leaf, BarChart3, LogOut, User } from 'lucide-react';
import { DashboardView, UserRole, AuthUser } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: DashboardView;
  setActiveView: (view: DashboardView) => void;
  isAgenticMode: boolean;
  setIsAgenticMode: (mode: boolean) => void;
  user: AuthUser;
  onLogout: () => void;
}

const ALL_NAV_ITEMS = [
  { id: 'overview',    label: 'Overview',       icon: LayoutDashboard, roles: ['student','faculty','admin'] },
  { id: 'energy',      label: 'Energy Analysis', icon: Zap,             roles: ['faculty','admin'] },
  { id: 'water-waste', label: 'Water & Waste',   icon: Droplets,        roles: ['faculty','admin'] },
  { id: 'predictions', label: 'AI Predictions',  icon: TrendingUp,      roles: ['faculty','admin'] },
  { id: 'admin',       label: 'Admin Panel',     icon: Settings,        roles: ['admin'] },
] as const;

const ROLE_LABELS: Record<UserRole, string> = {
  student: 'Student',
  faculty: 'Faculty',
  admin: 'Administrator',
};

const ROLE_COLORS: Record<UserRole, string> = {
  student: 'bg-blue-100 text-blue-700',
  faculty: 'bg-amber-100 text-amber-700',
  admin: 'bg-emerald-100 text-emerald-700',
};

const Layout: React.FC<LayoutProps> = ({
  children, activeView, setActiveView,
  isAgenticMode, setIsAgenticMode,
  user, onLogout
}) => {
  const navItems = ALL_NAV_ITEMS.filter(item =>
    (item.roles as readonly string[]).includes(user.role)
  );

  React.useEffect(() => {
    const accessible = navItems.some(i => i.id === activeView);
    if (!accessible) setActiveView('overview');
  }, [user.role]);

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

        <div className="p-4 space-y-4 border-t border-slate-100">
          {(user.role === 'admin' || user.role === 'faculty') && (
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-4 text-white shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-white/20 p-1.5 rounded-lg">
                    <BarChart3 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider">Agentic Mode</span>
                </div>
                <button
                  onClick={() => setIsAgenticMode(!isAgenticMode)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                    isAgenticMode ? 'bg-emerald-400' : 'bg-white/20'
                  }`}
                >
                  <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                    isAgenticMode ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              <p className="text-[10px] text-indigo-100 leading-tight">
                {isAgenticMode
                  ? 'Autonomous AI Agents are actively orchestrating campus resources.'
                  : 'Switch to enable autonomous AI reasoning and RAG-driven insights.'}
              </p>
            </div>
          )}

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

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">
            {navItems.find(i => i.id === activeView)?.label || 'Dashboard'}
          </h2>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${ROLE_COLORS[user.role]}`}>
              {ROLE_LABELS[user.role]}
            </span>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-900 truncate max-w-[160px]">{user.email}</p>
              <p className="text-xs text-slate-500">{ROLE_LABELS[user.role]}</p>
            </div>
            <div className="w-10 h-10 rounded-full ring-2 ring-emerald-100 bg-emerald-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
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
