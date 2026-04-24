import React, { useState } from 'react';
import {
  FileText, Download, ExternalLink, Trash2, Plus,
  Calendar, BookOpen, Leaf, Sun, X,
} from 'lucide-react';
import { UserRole } from '../types';

interface Report {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  category: 'SDG Report' | 'Green Audit' | 'Energy' | 'Other';
  url: string;
  description: string;
  addedBy?: string;
}

const CATEGORY_STYLES: Record<Report['category'], { bg: string; text: string; border: string; icon: React.ReactNode }> = {
  'SDG Report':  { bg: 'bg-emerald-50',  text: 'text-emerald-700', border: 'border-emerald-200', icon: <BookOpen className="w-4 h-4" /> },
  'Green Audit': { bg: 'bg-teal-50',     text: 'text-teal-700',    border: 'border-teal-200',    icon: <Leaf     className="w-4 h-4" /> },
  'Energy':      { bg: 'bg-amber-50',    text: 'text-amber-700',   border: 'border-amber-200',   icon: <Sun      className="w-4 h-4" /> },
  'Other':       { bg: 'bg-slate-50',    text: 'text-slate-600',   border: 'border-slate-200',   icon: <FileText className="w-4 h-4" /> },
};

const INITIAL_REPORTS: Report[] = [
  {
    id: '1',
    title: 'SDG Annual Report 2022–23',
    subtitle: 'Centre of Excellence for Sustainable Development Goals',
    year: '2022–23',
    category: 'SDG Report',
    url: 'https://www.krmangalam.edu.in/pdfs/sdg/annual-report-2022-23.pdf',
    description:
      'Covers all 17 UN SDGs including No Poverty, Zero Hunger, Good Health, Gender Equality, Clean Energy, and Climate Action. Highlights KRMU research, events, internships, and global partnerships.',
  },
  {
    id: '2',
    title: 'SDG Annual Report 2023–24',
    subtitle: 'Centre of Excellence for Sustainable Development Goals',
    year: '2023–24',
    category: 'SDG Report',
    url: 'https://www.krmangalam.edu.in/pdfs/sdg/annual-report-23-24.pdf',
    description:
      "Documents KRMU's progress across all 17 SDGs for 2023–24, including 50+ research papers under SDG 3 & 9, a UN ECOSOC Youth Forum side event, and ongoing SDG book publication series.",
  },
  {
    id: '3',
    title: 'SDG Annual Report 2024–25',
    subtitle: 'Centre of Excellence for Sustainable Development Goals',
    year: '2024–25',
    category: 'SDG Report',
    url: 'https://www.krmangalam.edu.in/pdfs/sdg/annual-report-2024-25.pdf',
    description:
      'Latest annual SDG report documenting university-wide sustainability initiatives, community outreach, research outcomes, and progress benchmarks for the 2024–25 academic year.',
  },
  {
    id: '4',
    title: 'Green Audit Report — May 2025',
    subtitle: 'Campus Environmental Audit',
    year: '2025',
    category: 'Green Audit',
    url: 'https://www.krmangalam.edu.in/pdfs/sustainable/green-audit-krmu-23-05-2025.pdf',
    description:
      'Comprehensive green audit of the KRMU campus covering energy consumption, water usage, waste management, biodiversity, and overall environmental compliance as of May 2025.',
  },
  {
    id: '5',
    title: 'Solar Energy Initiative',
    subtitle: 'Renewable Energy — Campus Solar Write-up',
    year: '2025',
    category: 'Energy',
    url: 'https://www.krmangalam.edu.in/pdfs/sustainable/solar-write-up.pdf',
    description:
      "Details KRMU's solar energy installations, generation capacity, cost savings achieved, and the future roadmap for expanding renewable energy across campus buildings.",
  },
];

const CATEGORIES: Report['category'][] = ['SDG Report', 'Green Audit', 'Energy', 'Other'];

const AddReportModal: React.FC<{ onAdd: (r: Report) => void; onClose: () => void }> = ({ onAdd, onClose }) => {
  const [form, setForm] = useState({
    title: '', subtitle: '', year: '',
    category: 'SDG Report' as Report['category'],
    url: '', description: '',
  });
  const [error, setError] = useState('');

  const handle = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.title.trim() || !form.url.trim() || !form.year.trim()) {
      setError('Title, Year and URL are required.');
      return;
    }
    onAdd({ id: Date.now().toString(), ...form, addedBy: 'Admin' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-xl hover:bg-slate-100 transition-colors">
          <X className="w-5 h-5 text-slate-400" />
        </button>
        <h2 className="text-xl font-bold text-slate-900 mb-1">Add New Report</h2>
        <p className="text-sm text-slate-400 mb-6">Fill in the details to publish a new report link.</p>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2 mb-4">{error}</p>
        )}

        <div className="space-y-4">
          {([
            { label: 'Report Title *', key: 'title',    ph: 'e.g. SDG Annual Report 2025–26' },
            { label: 'Subtitle',       key: 'subtitle', ph: 'e.g. Centre of Excellence for SDGs' },
            { label: 'Year *',         key: 'year',     ph: 'e.g. 2025–26' },
            { label: 'Report URL *',   key: 'url',      ph: 'https://...' },
          ] as const).map(({ label, key, ph }) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">{label}</label>
              <input
                type="text"
                value={form[key]}
                onChange={e => handle(key, e.target.value)}
                placeholder={ph}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          ))}

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">Category</label>
            <select
              value={form.category}
              onChange={e => handle('category', e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={e => handle('description', e.target.value)}
              placeholder="Brief description of the report..."
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button onClick={submit} className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors">
            Publish Report
          </button>
        </div>
      </div>
    </div>
  );
};

const ReportCard: React.FC<{ report: Report; isAdmin: boolean; onDelete: (id: string) => void }> = ({ report, isAdmin, onDelete }) => {
  const cat = CATEGORY_STYLES[report.category];

  return (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className={`mt-0.5 p-2.5 rounded-xl border ${cat.bg} ${cat.border} flex-shrink-0`}>
            <span className={cat.text}>{cat.icon}</span>
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <h3 className="text-base font-bold text-slate-900 leading-snug">{report.title}</h3>
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${cat.bg} ${cat.text} ${cat.border}`}>
                {report.category}
              </span>
              {report.addedBy && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-violet-50 text-violet-600 border border-violet-100">
                  Added by Admin
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 font-medium">{report.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-xl flex-shrink-0">
          <Calendar className="w-3 h-3 text-slate-400" />
          <span className="text-xs font-bold text-slate-600">{report.year}</span>
        </div>
      </div>

      <p className="text-sm text-slate-500 leading-relaxed">{report.description}</p>

      <div className="flex items-center gap-2 pt-2 border-t border-slate-50">
        <a
          href={report.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors"
        >
          <ExternalLink className="w-4 h-4" /> View Report
        </a>
        <a
          href={report.url}
          download
          className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors"
        >
          <Download className="w-4 h-4" /> Download
        </a>
        {isAdmin && (
          <button
            onClick={() => onDelete(report.id)}
            className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        )}
      </div>
    </div>
  );
};

const SustainabilityReports: React.FC<{ userRole: UserRole }> = ({ userRole }) => {
  const [reports, setReports]     = useState<Report[]>(INITIAL_REPORTS);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter]       = useState<'All' | Report['category']>('All');

  const isAdmin = userRole === 'admin';

  const addReport    = (r: Report) => setReports(prev => [r, ...prev]);
  const deleteReport = (id: string) => setReports(prev => prev.filter(r => r.id !== id));

  const allCats: ('All' | Report['category'])[] = ['All', 'SDG Report', 'Green Audit', 'Energy', 'Other'];
  const filtered = filter === 'All' ? reports : reports.filter(r => r.category === filter);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {showModal && <AddReportModal onAdd={addReport} onClose={() => setShowModal(false)} />}

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Sustainability Reports</h1>
          <p className="text-slate-500 mt-1">
            Official KR Mangalam University sustainability &amp; SDG reports — open or download any report directly.
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Add Report
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {allCats.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
              filter === cat
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
            <span className="ml-1.5 text-xs opacity-60">
              {cat === 'All' ? reports.length : reports.filter(r => r.category === cat).length}
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
          <FileText className="w-10 h-10 opacity-30" />
          <p className="text-sm font-medium">No reports in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filtered.map(r => (
            <ReportCard key={r.id} report={r} isAdmin={isAdmin} onDelete={deleteReport} />
          ))}
        </div>
      )}

      {isAdmin && (
        <p className="text-xs text-slate-400 text-center pt-2">
          You are viewing as <strong>Administrator</strong> — you can add or remove reports.
        </p>
      )}
    </div>
  );
};

export default SustainabilityReports;
